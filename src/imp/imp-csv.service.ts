import fs from 'fs'
import { parse } from 'csv-parse'
import { Injectable, Inject, LoggerService } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { csvRecParse, CsvRecType } from './csv/csv-rec-parse'
import { CreateSmElementInput } from '../element/dto/create-sm-element-input'
import { ElementService } from '../element/element.service'

@Injectable()
export class ImpCsvService {
  // eslint-disable-next-line no-unused-vars
  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    private readonly elementService: ElementService
  ) {}

  importRunupCiFullTree = async (csvFiles: string[]) => {
    for await (const fname of csvFiles) {
      this.readFile(fname)
    }
  }

  readFile = async (fname: string) => {
    this.logger.verbose(`Import CSV: ${fname}`)

    const startTime = performance.now()

    // const rootInd: { [k: string]: CsvRecType } = {}
    const ciInd: { [k: string]: CsvRecType } = {}
    const ciLinkInd: { [k: string]: { ci: string; up: string } } = {}

    const regCi = (ci: string, attrs: CsvRecType = {}, up?: string) => {
      // If CI doesn't exist in CI index
      if (!ciInd[ci]) {
        // Fill ATTRS
        ciInd[ci] = attrs
        // // If UP is undef put CI into ROOT index
        // if (!up) if (!rootInd[ci]) rootInd[ci] = attrs
      }

      // If UP defined
      if (up) {
        // Reg UP
        regCi(up)
        // Put CI as child of UP
        ciLinkInd[`${ci}-${up}`] = { ci, up }
        // // Del CI from ROOT index
        // delete rootInd[ci]
      }

      // regCI (ci, up):
      //   CI not exists in CIs
      //     put CI into CIs
      //     UP is undef
      //       put CI into Roots
      //   Attrs are
      //     update Attrs
      //   //
      //   UP is def
      //     regCI(UP, undef)
      //     put CI as child of UP
      //     del CI from Roots
    }

    const readPipe = fs.createReadStream(fname).pipe(
      parse({
        // CSV options
        bom: true,
        skip_empty_lines: true,
        columns: (h) => h.map((column: any) => column.toLowerCase()),
        // on_record: (r, _ctx) => {
        //   console.log('on_record: before: r=', r)
        //   r.h_name = r.h_name.replace(/[* ]*/g, '')
        //   console.log('on_record: after: r=', r)
        // },
        // [lines, record[2], record[0]],
      })
    )
    for await (const { level, full_path, ...raw } of readPipe) {
      const csvRec: CsvRecType = csvRecParse(raw)
      // CI code
      const ci = csvRec.h_name
      // Parent CI code
      const up = full_path.slice(-10)

      // console.log('full_path=', full_path, 'up=', up)
      // console.log('csvRec=', csvRec)
      // console.log('slice=', ''.slice(-10) ? 1 : 0)

      // Skip empty CIs
      if (!ci) continue

      regCi(ci, csvRec, up)
    }
    // console.log(`rootInd.count=`, Object.keys(rootInd).length, `rootInd=`, rootInd)
    console.log(`ciInd.count=`, Object.keys(ciInd).length, `ciInd=`, ciInd)
    console.log(`ciLinkInd.count=`, Object.keys(ciLinkInd).length)

    const elements: CreateSmElementInput[] = []

    for await (const [smCiCode, el] of Object.entries(ciInd)) {
      console.log('el=', el)
      if (el)
        elements.push({
          smCiCode,
          smType: el.type,
          smSubtype: el.subtype,
          smHpcStatus: el.hpc_status,
          smEnvironment: el.environment,
          smName: el.name2,
          smIpAddressList: el.ip_address_list,
          smName2: el.name2,
          smJCpuProcCount: el.j_cpu_proc_count,
          smJCpuCount: el.j_cpu_count,
          smJRam: el.j_ram,
          smJHdd: el.j_hdd,
          smJSdd: el.j_ssd,
          smTpsPlacement: el.tps_placement,
        })
      else elements.push({ smCiCode })
    }
    console.log(`elements.count=`, Object.keys(elements).length, `elements=`, elements)
    this.elementService.bulkImpSm(elements)

    const endTime = performance.now()
    console.log(`Took ${endTime - startTime} milliseconds`)
  }
}

import { Injectable, Inject, LoggerService } from '@nestjs/common'
import { readFile as xlsxReadFile, ParsingOptions, WorkBook, Range, WorkSheet, utils } from 'xlsx'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

const trimPtrn = `[\\s\\uFEFF\\xA0;'",]|\\\\n|\\\\r`
const trimRegex = new RegExp(`^(${trimPtrn})+|(${trimPtrn})+$`, 'g')

export type HeadCell = { c: number; v?: any }
export type HeadRow = {
  r: number
  headers: HeadCell[]
}
export type Row = Record<string, string | undefined>
export type WsData = { headRow?: HeadRow; rows?: Row[] }
export type WbData = Record<string, WsData>

@Injectable()
export class ImpXlsxService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  impSystems = async (
    xlsxFiles: string[],
    options: {
      wsNames?: string[]
      sheetRows?: number
    } = {}
  ) => {
    options.wsNames = ['Автоматизированная система']

    for (const fname of xlsxFiles) {
      this.logger.verbose(`Import XLSX: ${fname}`)
      const wb = this.readFile(fname, options?.sheetRows)

      this.logger.verbose(`sheetNames: ${JSON.stringify(wb.SheetNames, null, 2)}`)
      const wbData: WbData = {}
      wb.SheetNames.forEach((wsName) => {
        if (options?.wsNames && !options.wsNames.includes(wsName)) return
        const ws = wb.Sheets[wsName]
        // console.time(`TIME: getRange(${wsName})`)
        const range = this.getRange(ws)
        console.log('range=', range)
        // console.timeEnd(`TIME: getRange(${wsName})`)
        const wsData: WsData = {}
        //   headRow: undefined,
        //   rows: undefined
        // }
        if (range) {
          wsData.headRow = this.headRow(ws, range)
          // console.log("headRaw=", wsData.headRow)
          //   //   // wsData.headers = elimDupHeaders(headRow(ws, range))
          wsData.rows = this.getRows(ws, range, wsData.headRow)
          console.log('row0=', wsData.rows[0])
          console.log('row0.Описание=', JSON.stringify(wsData.rows[0]['Описание'], null, 2))
          wbData[wsName] = wsData
        } else this.logger.warn(`Wheet '${wsName}' has no data`)
      })
    }
  }

  readFile = (fname: string, sheetRows?: number): WorkBook => {
    const parsingOptions: ParsingOptions = sheetRows ? { sheetRows } : {}
    return xlsxReadFile(fname, { cellDates: true, ...parsingOptions })
  }

  getRange = (ws: WorkSheet) => {
    const range = ws['!ref']
    return range ? utils.decode_range(range) : undefined
  }

  headRow = (ws: WorkSheet, range: Range, headerRowOffset: number = 0) => {
    const hr_: HeadRow = { r: range.s.r + headerRowOffset, headers: [] }
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = ws[utils.encode_cell({ c, r: hr_.r })]
      if (cell && cell.t)
        hr_.headers.push({
          c,
          v: utils.format_cell(cell).replace(trimRegex, ''),
        })
    }
    return hr_
  }

  getRows = (ws: WorkSheet, range: Range, headRow: HeadRow, dataOffset: number = 0) => {
    const rows: Row[] = []
    // console.log("headRow=", headRow)
    for (let r = range.s.r + dataOffset; r <= range.e.r; r++) {
      if (r === headRow.r) continue
      // console.log("r=", r)
      const row_: Row = {}
      headRow.headers.forEach((h) => {
        if (h.v) row_[h.v] = utils.format_cell(ws[utils.encode_cell({ c: h.c, r })]).replace(trimRegex, '')
      })
      // for (let c = range.s.c; c <= range.e.c; ++c) {
      //     if (headers[c])
      //       row_[headers[c]] = (utils.format_cell(ws[utils.encode_cell({ c, r })])).replace(trimRegex, "")
      // }
      rows.push(row_)
    }
    return rows
  }
}

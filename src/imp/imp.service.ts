import { Inject, Injectable, LoggerService } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { ImpObjType, ImpObj, ImpObjAction } from './imp.config'

// import { NodeService } from '../ita/repo/node.service'
// import { NodeTypeService } from '../ita/repo/node-type.service'

@Injectable()
export class ImpService {
  constructor(
    // private readonly nodeService: NodeService,
    // private readonly nodeTypeService: NodeTypeService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    // const nodeTypes = await nodeTypeService.getNodeTypes()
    // console.log('nodeTypes=', nodeTypes)
  }

  imp = (obj: any, meta: Record<string, ImpObj>) => {

    const nodeIdx: Record<string, any> = {}
    const edgeArray: any[] = []

    const flatten = (obj: any): void => {
      const type_ = typeof obj

      // Primitive
      if (!obj || type_ !== 'object') return

      // Array
      if (Array.isArray(obj)) {
        for (const v of obj) flatten(v)
        return
      }

      // Object
      if (type_ === 'object') {
        const objMeta = meta && obj.kind ? meta[obj.kind] : undefined

        if (objMeta?.impAction === ImpObjAction.SKIP) {
          this.logger.warn(`Skip: ${JSON.stringify(obj, null, 2)}`)

        } else {
          for (const [k, v] of Object.entries(obj)) {
            flatten(v)
          }

          if (objMeta) {
            if (objMeta.impType === ImpObjType.NODE) {
              nodeIdx[obj[objMeta.impId]] = obj
            }
            if (objMeta.impType === ImpObjType.EDGE) {
              edgeArray.push(obj)
            }
          }
        }

        // if (obj.kind) {
        //   const objMeta = meta[obj.kind]
        //   if (objMeta) {
        //     if (objMeta.impAction === ImpObjAction.SKIP) {
        //       this.logger.warn(`Skip: ${JSON.stringify(obj, null, 2)}`)
        //     } else {
        //       if (objMeta.impType === ImpObjType.NODE) {
        //         nodeIdx[obj[objMeta.impId]] = obj
        //       }
        //       if (objMeta.impType === ImpObjType.EDGE) {
        //         edgeArray.push(obj)
        //       }
        //     }
        //   } else {
        //     console.log('o=', obj)
        //     throw new Error(`Missing config for: ${JSON.stringify(obj, null, 2)}`)
        //   }
        // }
      }
    }

    flatten(obj)

    // console.log('nodeIdx=', JSON.stringify(nodeIdx, null, 2))
    // console.log('edgeArray=', JSON.stringify(edgeArray, null, 2))
  }
}

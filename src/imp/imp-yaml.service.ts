import fs from 'fs'
import { default as jsyaml } from 'js-yaml'
import { Inject, Injectable, LoggerService } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { ImpYamlMeta } from './imp-yaml.config'
import { ImpMeta } from './imp.config'

import { NodeService } from '../ita/repo/node.service'
import { NodeTypeService } from '../ita/repo/node-type.service'
import { ImpService } from './imp.service'

@Injectable()
export class ImpYamlService {
	constructor(
		private readonly nodeService: NodeService,
		private readonly nodeTypeService: NodeTypeService,
		private readonly impService: ImpService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {
		// const nodeTypes = await nodeTypeService.getNodeTypes()
		// console.log('nodeTypes=', nodeTypes)
	}

	// importYaml = async (yaml: any, meta: any, upKey?: any): Promise<void> => {

	// 	// Ensure non-empty yaml & meta
	// 	if (!(yaml && meta)) return

	// 	if (meta.type === ImpValueType.Root) {
	// 		const idKey = meta.idKey
	// 		this.logger.verbose(`Root: ${idKey}`)
	// 		this.importYaml(yaml[idKey], meta[idKey], idKey)

	// 	} else if (meta.type === ImpValueType.ObjArray) {
	// 		for (const obj of yaml) {
	// 			const idKey = meta.idKey
	// 			const objMeta = meta.keys[obj[idKey]]
	// 			this.logger.verbose(``)
	// 			if (objMeta) this.importYaml(obj, objMeta, idKey)
	// 			else throw new Error(
	// 				`Missing definition for: ${JSON.stringify(obj, null, 2)}`
	// 			)
	// 		}

	// 	} else if (meta.type === ImpValueType.Node) {
	// 		const subKeys = meta.sub && Object.keys(meta.sub)
	// 		console.log('Node: subKeys=', subKeys)
	// 		for (const [k, v] of Object.entries(yaml)) {
	// 			console.log('Node:', yaml[upKey], 'key=', k, 'val=', v)
	// 			if (subKeys && subKeys.includes(k)) this.importYaml(
	// 				yaml[k], meta.sub[k], meta.sub[k].idKey
	// 			)
	// 		}

	// 		this.nodeService.createNode({
	// 			id: 'example',
	// 			nodeTypeId: 1,
	// 		})

	// 	} else if (meta.type === ImpValueType.Edge) {
	// 		for (const [k, v] of Object.entries(yaml)) {
	// 			console.log('Edge:', yaml[upKey], 'key=', k, 'val=', v)
	// 		}
	// 	}

	// 	// const root = doc[MetaYamlRoot]
	// 	// if (!root) throw new Error(`YAML Root not found: ${MetaYamlRoot}`)

	// 	// if (Array.isArray(yaml)) {
	// 	// 	for (const el of yaml) this.importYaml(el)
	// 	// 	return
	// 	// }

	// 	// const kind = yaml[MetaYamlKind]
	// 	// if (!kind) throw new Error(`Missing Kind: ${JSON.stringify(yaml, null, 2)}`)

	// 	// this.logger.debug(`kind= ${kind}`)
	// }

	importFromFiles = async (yamlFiles: string[]) => {

		await this.nodeTypeService.initCache()

		for (const yamlFile of yamlFiles) {

			this.logger.verbose(`Import YAML: ${yamlFile}`)

			const yaml = jsyaml.load(fs.readFileSync(yamlFile, 'utf8'))
			// TODO: add diagnostics (more exact error from jsyaml)
			if (!yaml) throw new Error(`Unable to import YAML '${yamlFile}'`)

			// console.log('yaml=', JSON.stringify(yaml, null, 2))

			this.impService.imp(yaml, ImpYamlMeta)
			// this.importYaml(yaml, impYamlMeta)
		}
	}
}

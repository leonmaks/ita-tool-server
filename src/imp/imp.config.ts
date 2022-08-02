import { Edge } from '../ita/repo/entities/edge.entity'
import { Node } from '../ita/repo/entities/node.entity'

export enum ImpObjType {
  NODE,
  EDGE,
}

export enum ImpObjAction {
  SKIP,
}

interface ImpObjCommon {
  impType: ImpObjType,
  impAction?: ImpObjAction,
}

export interface ImpObjNode extends ImpObjCommon {
  impType: ImpObjType.NODE,
  impId?: string,
  impUpId?: string,
  impAttrs?: string[],
}

export interface ImpObjEdge extends ImpObjCommon {
  impType: ImpObjType.EDGE,
  sourceYamlId?: string,
  targetYamlId?: string,
}

export type ImpObj = ImpObjNode | ImpObjEdge

export type ImpMeta = Record<string, ImpObj>



//  = {
//   System: {
//     impId: 'yamlId',
//     attrs: ['name'],
//   },
  // type: ImpValueType.Root,
  // idKey: 'digitalArchitecture',
  // digitalArchitecture: {
  //   type: ImpValueType.ObjArray,
  //   idKey: 'kind',
  //   keys: {
  //     System: {
  //       type: Node,
  //       impId: 'yamlId',
  //     },
  //     SubSystem: {
  //       type: ImpValueType.Node,
  //       keys: {
  //         impId: 'yamlId',
  //         attrs: ['name', 'earepoCode', 'guid', 'serviceManagerId:ciCode', 'status', 'systemType'],
  //       }
  //     },
  //     TechnologicalComponent: {
  //       type: ImpValueType.Node,
  //       keys: {
  //         // impId: 'yamlId',
  //         // parentImpId: 'parentYamlId',
  //         // attrs: ['name', 'earepoCode', 'serviceManagerId:ciCode', 'status'],
  //         // arrays: {
  //         //   validSpecies: { type: ImpValueType.ValArray, },
  //         //   versions: {
  //         //     type: ImpValueType.ObjArray,
  //         //     idKey: 'kind',
  //         //     keys: {
  //         //       TechnologicalComponentVersion: {
  //         //         type: ImpValueType.Node,
  //         //         impId: 'yamlId',
  //         //         attrs: ['versionNumber'],
  //         //       }
  //         //     }
  //         //   }
  //         // }
  //       },
  //       sub: {
  //         versions: {
  //           type: ImpValueType.ObjArray,
  //           idKey: 'kind',
  //           keys: {
  //             TechnologicalComponentVersion: {
  //               type: ImpValueType.Node,
  //               keys: {
  //                 impId: 'yamlId',
  //               }
  //             }
  //           }
  //         }
  //       }
  //     },
  //     TechnologicalInteraction: {
  //       type: ImpValueType.Node,
  //       keys: {
  //         //     impId: 'yamlId',
  //         //     parentImpId: 'parentYamlId',
  //         //     attrs: ['name', 'description'],
  //       },
  //       sub: {
  //         versions: {
  //           type: ImpValueType.ObjArray,
  //           idKey: 'kind',
  //           keys: {
  //             TechnologicalInteractionVersion: {
  //               type: ImpValueType.Node,
  //               keys: {}
  //             }
  //           }
  //         }
  //       }
  //     },
  //     IntegrationInteraction: {
  //       type: ImpValueType.Node,
  //       keys: {
  //       },
  //       sub: {
  //         externalSystem: {
  //           type: ImpValueType.Node,
  //           idKey: 'kind',
  //           keys: {
  //           },
  //           // sub: {
  //           //   pointVersions: {
  //           //     type: ImpValueType.ObjArray,
  //           //     keys: {}
  //           //   }
  //           // }
  //         },
  //         versions: {
  //           type: ImpValueType.ObjArray,
  //           idKey: 'kind',
  //           keys: {
  //             IntegrationInteractionVersion: {
  //               type: ImpValueType.Node,
  //               idKey: 'kind',
  //               keys: {}
  //             }
  //           }
  //         }
  //       }
  //     },
  //     IntegrationPoint: {
  //       type: ImpValueType.Node,
  //       keys: {
  //       },
  //       sub: {
  //         externalSystems: {
  //           type: ImpValueType.Node,
  //           idKey: 'kind',
  //           keys: {
  //           },
  //           // sub: {
  //           //   pointVersions: {
  //           //     type: ImpValueType.ObjArray,
  //           //     keys: {}
  //           //   }
  //           // }
  //         },
  //         versions: {
  //           type: ImpValueType.ObjArray,
  //           idKey: 'kind',
  //           keys: {
  //             IntegrationPointVersion: {
  //               type: ImpValueType.Node,
  //               idKey: 'kind',
  //               keys: {}
  //             }
  //           }
  //         }
  //       }

  //     },
  //     InteractionScenario: {
  //       type: ImpValueType.Node,
  //       keys: {
  //       },
  //       sub: {
  //         steps: {
  //           type: ImpValueType.ObjArray,
  //           idKey: 'kind',
  //           keys: {
  //             ScenarioStep: {
  //               type: ImpValueType.Node,
  //               idKey: 'kind',
  //               keys: {}
  //             }
  //           }
  //         }
  //       }

  //     },
  //     Stand: {
  //       type: ImpValueType.Node,
  //       keys: {}
  //     },
  //     TechnologicalResource: {
  //       type: ImpValueType.Node,
  //       keys: {}
  //     },
  //     Hardware: {
  //       type: ImpValueType.Node,
  //       keys: {}
  //     },
  //     TR_ON_HW: {
  //       type: ImpValueType.Edge,
  //       keys: {}
  //     },
  //     TC_ON_TR: {
  //       type: ImpValueType.Edge,
  //       keys: {}
  //     }
  //   }
  // }
// }

// export type YamlImpValue = string | number | boolean | null

// export enum YamlImpValueType {
//   kind = 'kind',
//   value = 'value',
// }

// export type YamlImpValueDef = {
//   col?: string,
//   val?: number,
// }

// export interface IYamlImpDef {
//   [obj: string]: {
//     [attr: string]: YamlImpValueDef
//   }
// }

// export const yamlImpDef: IYamlImpDef = {
//   System: {
//     kind: { col: 'typeId', val: 1 },
//     name: {},
//     yamlId: {},
//     parentYamlId: {},
//     earepoCode: {},
//     systemGuid: {},
//     arisCode: {},
//     fullName: {},
//     nickname: {},
//     description: {},
//     blockId: {},
//     cloudReady: {},
//     platformReady: {},
//     targetArchDiagram: {},
//     releaseDate: {},
//     serviceManagerId: {},
//     rsaId: {},
//     status: {},
//     statusC3: {},
//     centralizationLevel: {},
//     criticality: {},
//     targetStatus: {},
//     targetReadiness: {},
//     systemType: {},
//     nicknameEng: {},
//     shortDescription: {},
//     objectTypeKE: {},
//     functionality: {},
//     dateDecommissioning: {},
//     dateProhibitionImprovements: {},
//     dateLastChange: {},
//     platform: {},
//     integration: {},
//     receivedDataConfLevel: {},
//     receivedDataIntegrityLevel: {},
//     ciiCategory: {},
//   },
//   SubSystem: {
//     kind: {},
//     name: {},
//     yamlId: {},
//     parentYamlId: {},
//     earepoCode: {},
//     systemGuid: {},
//     parentGuid: {},
//     arisCode: {},
//     fullName: {},
//     nickname: {},
//     description: {},
//     blockId: {},
//     cloudReady: {},
//     platformReady: {},
//     targetArchDiagram: {},
//     releaseDate: {},
//     serviceManagerId: {},
//     rsaId: {},
//     status: {},
//     statusC3: {},
//     centralizationLevel: {},
//     criticality: {},
//     targetStatus: {},
//     targetReadiness: {},
//     systemType: {},
//     nicknameEng: {},
//     shortDescription: {},
//     objectTypeKE: {},
//     functionality: {},
//     dateDecommissioning: {},
//     dateProhibitionImprovements: {},
//     dateLastChange: {},
//     platform: {},
//     integration: {},
//     receivedDataConfLevel: {},
//     receivedDataIntegrityLevel: {},
//     ciiCategory: {},
//   },
//   TechnologicalComponent: {
//     kind: {},
//     name: {},
//     yamlId: {},
//     parentYamlId: {},
//     earepoCode: {},
//     systemGuid: {},
//     moduleGuid: {},
//     typeTechnology: {},
//     typeTechnologyLabel: {},
//     destinationCode: {},
//     destinationCodeLabel: {},
//     typeCode: {},
//     typeLabel: {},
//     technologyKindCode: {},
//     technologyKindLabel: {},
//     languageCode: {},
//     languageLabel: {},
//     frameworkCode: {},
//     frameworkLabel: {},
//     functionality: {},
//     dateLastChange: {},
//     authorLastChange: {},
//     typeLastChange: {},
//     containerName: {},
//     isContainer: {},
//   },
//   TechnologicalInteraction: {
//     kind: {},
//     name: {},
//     yamlId: {},
//     consumerTechnologicalComponentYamlId: {},
//     producerTechnologicalComponentYamlId: {},
//     earepoCode: {},
//     codeFo: {},
//     interactionType: {},
//     mechanism: {},
//     description: {},
//     consumerId: {},
//     consumerName: {},
//     consumerComponentId: {},
//     consumerComponentName: {},
//     consumerComponentCode: {},
//     initiator: {},
//     providerId: {},
//     providerName: {},
//     providerComponentId: {},
//     providerComponentName: {},
//     providerComponentCode: {},
//     stopVersioning: {},
//     overloadProtection: {},
//     availabilitySlaSld: {},
//     authorLastChange: {},
//     dateLastChange: {},
//     consumerGuid: {},
//     providerGuid: {},
//     allowCreateVersions: {},
//     versions: {},
//   },
//   IntegrationInteraction: {
//     kind: {},
//     name: {},
//     yamlId: {},
//     parentYamlId: {},
//     informationStreamYamlId: {},
//     systemId: {},
//     infoStreamCode: {},
//     interactionPointId: {},
//     description: {},
//     earepoCode: {},
//     externalSystem: {},
//     versions: {},
//   },
//   IntegrationPoint: {
//     kind: {},
//     name: {},
//     yamlId: {},
//     parentYamlId: {},
//     earepoCode: {},
//     asProviderId: {},
//     type: {},
//     approvalStatus: {},
//     otherType: {},
//     apiName: {},
//     isLocal: {},
//     isComplex: {},
//     associatedPointId: {},
//     apiId: {},
//     apiVersionId: {},
//     apiMethodId: {},
//     externalSystems: {},
//     versions: {},
//   },
//   InteractionScenario: {
//     kind: {},
//     name: {},
//     yamlId: {},
//     parentYamlId: {},
//     systemId: {},
//     earepoCode: {},
//     steps: {},
//   }
// }

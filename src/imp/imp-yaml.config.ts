import { ImpObjType, ImpMeta, ImpObjAction } from './imp.config'

// import { Edge } from '../ita/repo/entities/edge.entity'
// import { Node } from '../ita/repo/entities/node.entity'

// type ImpObjType = typeof Node | typeof Edge

// type ImpObj = {
//   objType: ImpObjType,
//   impI: string,

// }

// export enum ImpValueType {
//   Root,
//   ObjArray,
//   ValArray,
//   Node,
//   Edge,
// }


export const ImpYamlMeta: ImpMeta = {

  // App structure
  System: {
    impType: ImpObjType.NODE,
    impId: 'yamlId',
    impAttrs: ['name'],
  },
  SubSystem: {
    impType: ImpObjType.NODE,
    impId: 'yamlId',
    impUpId: 'parentYamlId',
    impAttrs: ['name'],
  },
  TechnologicalComponent: {
    impType: ImpObjType.NODE,
    impId: 'yamlId',
    impUpId: 'parentYamlId',
    impAttrs: ['name'],
  },
  TechnologicalComponentVersion: {
    impType: ImpObjType.NODE,
    impId: 'yamlId',
  },

  // Infra
  TechnologicalResource: {
    impType: ImpObjType.NODE,
    impId: 'yamlId',
    impUpId: 'parentYamlId',
  },
  Stand: {
    impType: ImpObjType.NODE,
    impId: 'yamlId',
    impUpId: 'parentYamlId',
    impAttrs: ['name'],
  },
  Hardware: {
    impType: ImpObjType.NODE,
    impId: 'yamlId',
    impAttrs: ['name'],
  },

  // Integration
  InteractionScenario: {
    impType: ImpObjType.NODE,
    impAction: ImpObjAction.SKIP,
    impId: 'yamlId',
    impUpId: 'parentYamlId',
    impAttrs: ['name'],
  },
  ScenarioStep: {
    impType: ImpObjType.NODE,
  },
  IntegrationPoint: {
    impType: ImpObjType.NODE,
    impAction: ImpObjAction.SKIP,
    impId: 'yamlId',
    impUpId: 'parentYamlId',
    impAttrs: ['name'],
  },
  IntegrationPointVersion: {
    impType: ImpObjType.NODE,
    impId: 'yamlId',
  },
  IntegrationInteraction: {
    impType: ImpObjType.NODE,
    impAction: ImpObjAction.SKIP,
    impId: 'yamlId',
    impUpId: 'parentYamlId',
    impAttrs: ['name'],
  },
  IntegrationInteractionVersion: {
    impType: ImpObjType.NODE,
    impId: 'yamlId',
  },
  TechnologicalInteraction: {
    impType: ImpObjType.NODE,
    impAction: ImpObjAction.SKIP,
    impId: 'yamlId',
    impUpId: 'parentYamlId',
    impAttrs: ['name'],
  },
  TechnologicalInteractionVersion: {
    impType: ImpObjType.NODE,
  },

  // Deployment (edges)
  TC_ON_TR: {
    impType: ImpObjType.EDGE,
    sourceYamlId: 'techCompVersionYamlId',
    targetYamlId: 'techResYamlId',
  },
  TR_ON_HW: {
    impType: ImpObjType.EDGE,
    sourceYamlId: 'techResYamlId',
    targetYamlId: 'hwYamlId',
  },
}


// export const impYamlMeta = {
//   type: ImpValueType.Root,
//   idKey: 'digitalArchitecture',
//   digitalArchitecture: {
//     type: ImpValueType.ObjArray,
//     idKey: 'kind',
//     keys: {
//       System: {
//         type: Node,
//         impId: 'yamlId',
//       },
//       SubSystem: {
//         type: ImpValueType.Node,
//         keys: {
//           impId: 'yamlId',
//           attrs: ['name', 'earepoCode', 'guid', 'serviceManagerId:ciCode', 'status', 'systemType'],
//         }
//       },
//       TechnologicalComponent: {
//         type: ImpValueType.Node,
//         keys: {
//           // impId: 'yamlId',
//           // parentImpId: 'parentYamlId',
//           // attrs: ['name', 'earepoCode', 'serviceManagerId:ciCode', 'status'],
//           // arrays: {
//           //   validSpecies: { type: ImpValueType.ValArray, },
//           //   versions: {
//           //     type: ImpValueType.ObjArray,
//           //     idKey: 'kind',
//           //     keys: {
//           //       TechnologicalComponentVersion: {
//           //         type: ImpValueType.Node,
//           //         impId: 'yamlId',
//           //         attrs: ['versionNumber'],
//           //       }
//           //     }
//           //   }
//           // }
//         },
//         sub: {
//           versions: {
//             type: ImpValueType.ObjArray,
//             idKey: 'kind',
//             keys: {
//               TechnologicalComponentVersion: {
//                 type: ImpValueType.Node,
//                 keys: {
//                   impId: 'yamlId',
//                 }
//               }
//             }
//           }
//         }
//       },
//       TechnologicalInteraction: {
//         type: ImpValueType.Node,
//         keys: {
//           //     impId: 'yamlId',
//           //     parentImpId: 'parentYamlId',
//           //     attrs: ['name', 'description'],
//         },
//         sub: {
//           versions: {
//             type: ImpValueType.ObjArray,
//             idKey: 'kind',
//             keys: {
//               TechnologicalInteractionVersion: {
//                 type: ImpValueType.Node,
//                 keys: {}
//               }
//             }
//           }
//         }
//       },
//       IntegrationInteraction: {
//         type: ImpValueType.Node,
//         keys: {
//         },
//         sub: {
//           externalSystem: {
//             type: ImpValueType.Node,
//             idKey: 'kind',
//             keys: {
//             },
//             // sub: {
//             //   pointVersions: {
//             //     type: ImpValueType.ObjArray,
//             //     keys: {}
//             //   }
//             // }
//           },
//           versions: {
//             type: ImpValueType.ObjArray,
//             idKey: 'kind',
//             keys: {
//               IntegrationInteractionVersion: {
//                 type: ImpValueType.Node,
//                 idKey: 'kind',
//                 keys: {}
//               }
//             }
//           }
//         }
//       },
//       IntegrationPoint: {
//         type: ImpValueType.Node,
//         keys: {
//         },
//         sub: {
//           externalSystems: {
//             type: ImpValueType.Node,
//             idKey: 'kind',
//             keys: {
//             },
//             // sub: {
//             //   pointVersions: {
//             //     type: ImpValueType.ObjArray,
//             //     keys: {}
//             //   }
//             // }
//           },
//           versions: {
//             type: ImpValueType.ObjArray,
//             idKey: 'kind',
//             keys: {
//               IntegrationPointVersion: {
//                 type: ImpValueType.Node,
//                 idKey: 'kind',
//                 keys: {}
//               }
//             }
//           }
//         }

//       },
//       InteractionScenario: {
//         type: ImpValueType.Node,
//         keys: {
//         },
//         sub: {
//           steps: {
//             type: ImpValueType.ObjArray,
//             idKey: 'kind',
//             keys: {
//               ScenarioStep: {
//                 type: ImpValueType.Node,
//                 idKey: 'kind',
//                 keys: {}
//               }
//             }
//           }
//         }

//       },
//       Stand: {
//         type: ImpValueType.Node,
//         keys: {}
//       },
//       TechnologicalResource: {
//         type: ImpValueType.Node,
//         keys: {}
//       },
//       Hardware: {
//         type: ImpValueType.Node,
//         keys: {}
//       },
//       TR_ON_HW: {
//         type: ImpValueType.Edge,
//         keys: {}
//       },
//       TC_ON_TR: {
//         type: ImpValueType.Edge,
//         keys: {}
//       }
//     }
//   }
// }

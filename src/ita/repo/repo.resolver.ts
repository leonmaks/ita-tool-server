import { Resolver, Query } from '@nestjs/graphql'

import { NodeType } from './entities/node-type.entity'

import { NodeTypeService } from './node-type.service'

@Resolver()
export class RepoResolver {
  constructor(
    private readonly nodeTypeService: NodeTypeService,
  ) {}

  @Query(() => [NodeType])
  getNodeTypes() {
    return this.nodeTypeService.getNodeTypes()
  }
}

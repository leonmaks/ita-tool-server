import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Viewpoint } from './entities/viewpoint.entity'
import { Node } from './entities/node.entity'
import { NodeType } from './entities/node-type.entity'
import { Edge } from './entities/edge.entity'

import { RepoResolver } from './repo.resolver'
import { ViewpointService } from './viewpoint.service'
import { NodeService } from './node.service'
import { NodeTypeService } from './node-type.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Viewpoint,
      Node,
      NodeType,
      Edge,
    ]),
  ],
  providers: [
    RepoResolver,
    ViewpointService,
    NodeService,
    NodeTypeService,
  ],
  exports: [
    ViewpointService,
    NodeService,
    NodeTypeService,
  ],
})
export class RepoModule {}

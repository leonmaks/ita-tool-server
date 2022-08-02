import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm'

import { AppPfx } from '../../../app.config'
import { NodeParam } from './node-param.entity'
import { Node } from './node.entity'
import { NodeType } from './node-type.entity'

@ObjectType()
@Entity(`${AppPfx}_node_param_value`)
@Unique(['node', 'nodeParam'])
export class NodeParamValue {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Node, node => node.id, { eager: true, nullable: false })
  node: Node

  @ManyToOne(() => NodeParam, nodeParam => nodeParam.id, { eager: true, nullable: false })
  nodeParam: NodeParam

  @Field()
  @Column()
  value: string
}

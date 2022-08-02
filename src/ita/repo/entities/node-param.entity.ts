import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm'

import { AppPfx } from '../../../app.config'
import { NodeType } from './node-type.entity'

@ObjectType()
@Entity(`${AppPfx}_node_param`)
@Unique(['nodeType', 'name'])
export class NodeParam {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => NodeType, nodeType => nodeType.id, { eager: true, nullable: false })
  nodeType: NodeType

  @Field()
  @Column()
  name: string
}

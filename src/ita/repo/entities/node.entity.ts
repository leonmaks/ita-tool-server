import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'

import { AppPfx } from '../../../app.config'

import { NodeType } from './node-type.entity'
import { Edge } from './edge.entity'

@ObjectType()
@Entity(`${AppPfx}_node`)
export class Node {

  @Field(_type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

	@Field()
	@Column()
	name: string

  @ManyToOne(_type => NodeType, nodeType => nodeType.id, { eager: true, nullable: false })
  nodeType: NodeType

  @OneToMany(_type => Edge, edge => edge.source, { eager: true, cascade: true })
  sourceEdges: Edge[]

  @OneToMany(_type => Edge, edge => edge.target, { eager: true, cascade: true })
  targetEdges: Edge[]
}

import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { AppPfx } from '../../../app.config'

import { Node } from './node.entity'

@ObjectType()
@Entity(`${AppPfx}_edge`)
export class Edge {

	@Field(_type => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(_type => Node, node => node.sourceEdges, { eager: false, nullable: false })
	source: Node

	@ManyToOne(_type => Node, node => node.targetEdges, { eager: false, nullable: false })
	target: Node
}

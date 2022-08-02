import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

import { AppPfx } from '../../../app.config'
// import { Edge } from './edge.entity'
import { Node } from './node.entity'

@ObjectType()
@Entity(`${AppPfx}_node_type`)
export class NodeType {

	@Field(_type => ID)
	@PrimaryColumn()
	id: number

	@Field()
	@Column({ unique: true })
	name: string

	@OneToMany(_type => Node, node => node.nodeType, { eager: false })
	nodes: Node[]
}

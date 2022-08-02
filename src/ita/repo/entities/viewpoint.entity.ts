import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

import { AppPfx } from '../../../app.config'

// import { Edge } from './edge.entity'

@ObjectType()
@Entity(`${AppPfx}_viewpoint`)
export class Viewpoint {

	@Field(type => ID)
	@PrimaryColumn()
	id: number

	@Field()
	@Column({ unique: true })
	name: string
}

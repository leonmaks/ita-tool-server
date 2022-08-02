import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, PrimaryColumn } from 'typeorm'

import { AppPfx } from '../../app.config'

@ObjectType()
@Entity(`${AppPfx}_element_type`)
export class ElementType {

	@Field(type => ID)
	@PrimaryColumn()
	id: number

	@Field()
	@Column({ unique: true })
	name: string
}

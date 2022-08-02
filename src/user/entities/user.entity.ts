import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'

import { AppPfx } from '../../app.config'
import { Task } from '../../task/entities/task.entity'

@ObjectType()
@Entity(`${AppPfx}_user`)
export class User {

	@Field(type => ID)
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column({ unique: true })
	username: string

	@Field({ nullable: true })
	@Column({ nullable: true })
	email?: string

	@Column({ select: false, nullable: true })
	password?: string

	@Column({ nullable: true })
	avatar?: string

	@OneToMany(_type => Task, task => task.user, { eager: true })
	tasks: Task[]
}

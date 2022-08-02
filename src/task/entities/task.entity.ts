import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

import { AppPfx } from '../../app.config'
import { TaskStatus } from '../task-status.enum'
import { User } from '../../user/entities/user.entity'

@Entity(`${AppPfx}_task`)
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus

  @ManyToOne(_type => User, user => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User
}

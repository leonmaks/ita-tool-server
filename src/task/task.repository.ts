import { NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'

import { CreateTaskInput } from './dto/create-task.input'
import { SearchTasksInput } from './dto/search-task.input'
import { UpdateTaskStatusInput } from './dto/update-task-status.input'
import { Task } from './entities/task.entity'
import { User } from '../user/entities/user.entity'
import { TaskStatus } from './task-status.enum'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  getTaskById = async (id: number, user: User) => {
    const task = await this.findOne({ where: { id, user } })
    if (!task) throw new NotFoundException(`Task with ID '${id}' not found`)
    return task
  }

  getTasks = async ({ status, search }: SearchTasksInput, user: User) => {
    const qb = this.createQueryBuilder('task')
    qb.where({ user })
    if (status) qb.andWhere('task.status = :status', { status })
    if (search) qb.andWhere(
      '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
      { search: `%${search}%` }
    )
    return qb.getMany()
  }

  createTask = async (taskInput: CreateTaskInput, user: User) => (
    this.save(
      this.create({
        ...taskInput,
        status: TaskStatus.OPEN,
        user,
      })
    )
  )

  updateTaskStatus = async (
    id: number,
    { status }: UpdateTaskStatusInput,
    user: User,
  ) => {
    const task = await this.getTaskById(id, user)
    task.status = status
    return this.save(task)
  }

  deleteTask = async (id: number, user: User) => {
    // TODO: restrict to only own tasks!
    if ((await this.delete({ id, user })).affected === 0)
      throw new NotFoundException(`Task with ID '${id}' not found`)
  }
}

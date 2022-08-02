import { Injectable } from '@nestjs/common'
// import { NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Viewpoint } from './entities/viewpoint.entity'

@Injectable()
export class ViewpointService {
  constructor(
    @InjectRepository(Viewpoint)
    private readonly viewpointRepository: Repository<Viewpoint>
  ) {}

  getViewpoints = async (): Promise<Viewpoint[]> => (
    this.viewpointRepository.find()
  )

  getViewpointsByIds = async (ids: number[]) => (
    await this.viewpointRepository.findByIds(ids)
  )

  // deleteTask = async (id: number, user: User) => {
  //   // TODO: restrict to only own tasks!
  //   if ((await this.delete({ id, user })).affected === 0)
  //     throw new NotFoundException(`Task with ID '${id}' not found`)
  // }
}



// import { EntityRepository, Repository } from 'typeorm'

// import { Viewpoint } from './entities/viewpoint.entity'

// @EntityRepository(Viewpoint)
// export class ViewpointRepository extends Repository<Viewpoint> {

//   // getTasks = async ({ status, search }: SearchTasksInput, user: User) => {
//   //   const qb = this.createQueryBuilder('task')
//   //   qb.where({ user })
//   //   if (status) qb.andWhere('task.status = :status', { status })
//   //   if (search) qb.andWhere(
//   //     '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
//   //     { search: `%${search}%` }
//   //   )
//   //   return qb.getMany()
//   // }

//   // createTask = async (taskInput: CreateTaskInput, user: User) => (
//   //   this.save(
//   //     this.create({
//   //       ...taskInput,
//   //       status: TaskStatus.OPEN,
//   //       user,
//   //     })
//   //   )
//   // )

//   // updateTaskStatus = async (
//   //   id: number,
//   //   { status }: UpdateTaskStatusInput,
//   //   user: User,
//   // ) => {
//   //   const task = await this.getTaskById(id, user)
//   //   task.status = status
//   //   return this.save(task)
//   // }
// }

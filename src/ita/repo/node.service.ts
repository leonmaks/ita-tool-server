import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateNodeInput } from './dto/create-node.input'

import { Node } from './entities/node.entity'

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node)
    private readonly nodeTypeRepository: Repository<Node>
  ) {}

  createNode = async (createNodeInput: CreateNodeInput): Promise<any> => (
    console.log('createNode: input=', createNodeInput)
  )

  // getNodeTypeByNameFromCache = async (
  //   nodeTypeName: string,
  // ): Promise<NodeType> => {
  //   if (!this.nodeTypeByNameCache) await this.initCache()
  //   return this.nodeTypeByNameCache[nodeTypeName]
  // }

  // getNodeTypes = async (): Promise<NodeType[]> => (
  //   await this.nodeTypeRepository.find()
  // )

  // getNodeTypesByIds = async (ids: number[]) => (
  //   await this.nodeTypeRepository.findByIds(ids)
  // )
}



// getTasks = async ({ status, search }: SearchTasksInput, user: User) => {
//   const qb = this.createQueryBuilder('task')
//   qb.where({ user })
//   if (status) qb.andWhere('task.status = :status', { status })
//   if (search) qb.andWhere(
//     '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
//     { search: `%${search}%` }
//   )
//   return qb.getMany()
// }

// createTask = async (taskInput: CreateTaskInput, user: User) => (
//   this.save(
//     this.create({
//       ...taskInput,
//       status: TaskStatus.OPEN,
//       user,
//     })
//   )
// )

// updateTaskStatus = async (
//   id: number,
//   { status }: UpdateTaskStatusInput,
//   user: User,
// ) => {
//   const task = await this.getTaskById(id, user)
//   task.status = status
//   return this.save(task)
// }

// deleteTask = async (id: number, user: User) => {
//   // TODO: restrict to only own tasks!
//   if ((await this.delete({ id, user })).affected === 0)
//     throw new NotFoundException(`Task with ID '${id}' not found`)
// }

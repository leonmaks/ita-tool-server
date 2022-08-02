import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateTaskInput } from './dto/create-task.input'
import { SearchTasksInput } from './dto/search-task.input'
import { UpdateTaskStatusInput } from './dto/update-task-status.input'
import { User } from '../user/entities/user.entity'
import { TaskRepository } from './task.repository'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  getTasks = async (filterInput: SearchTasksInput, user: User) => (
    this.taskRepository.getTasks(filterInput, user)
  )

  // getAll(): Task[] {
  //   return this.tasks
  // }

  // getWithFilters({ status, filter }: SearchTasksInput): Task[] {
  //   let tasks = this.getAll()
  //   if (status) tasks = tasks.filter(task => task.status === status)
  //   if (filter) tasks = tasks.filter(task => (
  //     task.title.includes(filter) || task.description.includes(filter)
  //   ))
  //   return tasks
  // }

  getTaskById = async (id: number, user: User) => this.taskRepository.getTaskById(id, user)

  createTask = async (taskInput: CreateTaskInput, user: User) => (
    this.taskRepository.createTask(taskInput, user)
  )

  updateTaskStatus = async (
    id: number,
    statusInput: UpdateTaskStatusInput,
    user: User,
  ) => (
    this.taskRepository.updateTaskStatus(id, statusInput, user)
  )

  deleteTask = async (id: number, user: User) => (
    this.taskRepository.deleteTask(id, user)
  )
}

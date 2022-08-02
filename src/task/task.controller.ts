import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { GetUser } from '../auth/get-user.decorator'
import { User } from '../user/entities/user.entity'
import { CreateTaskInput } from './dto/create-task.input'
import { SearchTasksInput } from './dto/search-task.input'
import { UpdateTaskStatusInput } from './dto/update-task-status.input'
import { TaskService } from './task.service'

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {

  constructor(
    private taskService: TaskService
  ) {}

  @Get()
  getTasks(
    @Query() searchInput: SearchTasksInput,
    @GetUser() user: User,
  ) {
    return this.taskService.getTasks(searchInput, user)
  }

  @Get(':id')
  async getTaskById(
    @Param('id') id: number,
    @GetUser() user: User,
  ) {
    return this.taskService.getTaskById(id, user)
  }

  @Post()
  async createTask(
    @Body() createTaskInput: CreateTaskInput,
    @GetUser() user: User,
  ) {
    return this.taskService.createTask(createTaskInput, user)
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: number,
    @Body() statusInput: UpdateTaskStatusInput,
    @GetUser() user: User,
  ) {
    return this.taskService.updateTaskStatus(id, statusInput, user)
  }

  @Delete(':id')
  async deleteTask(
    @Param('id') id: number,
    @GetUser() user: User,
  ) {
    return this.taskService.deleteTask(id, user)
  }
}

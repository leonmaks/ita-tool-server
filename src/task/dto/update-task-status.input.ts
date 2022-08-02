import { IsEnum } from 'class-validator'

import { TaskStatus } from '../task-status.enum'

export class UpdateTaskStatusInput {
  @IsEnum(TaskStatus)
  status: TaskStatus
}

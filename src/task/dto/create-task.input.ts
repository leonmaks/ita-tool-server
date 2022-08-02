import { IsNotEmpty } from 'class-validator'

export class CreateTaskInput {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
}

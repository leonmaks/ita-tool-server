import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

@InputType()
export class CreateNodeInput {
  @Field()
  @IsString()
  @IsOptional()
  id?: string

  @Field()
  @IsNotEmpty()
  nodeTypeId: number
}

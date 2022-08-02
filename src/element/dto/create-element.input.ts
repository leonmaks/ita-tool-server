import { Field, InputType, ID } from '@nestjs/graphql'

@InputType()
export class CreateElementInput {
  @Field()
  name: string

  @Field()
  guid: string

  @Field()
  ciCode: string

  @Field(() => ID)
  elementTypeId: number
}

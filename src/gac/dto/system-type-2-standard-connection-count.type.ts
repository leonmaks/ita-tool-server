import { Field, ObjectType } from '@nestjs/graphql'
import { string } from 'joi'

@ObjectType()
export class SystemType2StandardConnectionCount {
  @Field()
  systemTypeId: string
  @Field()
  systemTypeText: string
  @Field()
  standardId: string
  @Field()
  standardName: string
  @Field()
  connectionCount: number
}

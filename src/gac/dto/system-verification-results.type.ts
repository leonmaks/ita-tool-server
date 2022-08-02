import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SystemVerificationResults {
  @Field()
  asName: string
  @Field()
  connectedToGac: boolean
  @Field({ nullable: true })
  smartStandardName: string
  @Field({ nullable: true })
  smartStandardVersion: string
  @Field({ nullable: true })
  verificationDate: string
  @Field({ nullable: true })
  ruleCount: number
  @Field({ nullable: true })
  okCount: number
  @Field({ nullable: true })
  errCount: number
}

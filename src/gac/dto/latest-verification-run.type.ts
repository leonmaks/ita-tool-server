import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LatestVerificationRun {
  @Field()
  systemId: string
  @Field()
  verificationRunId: string
  @Field({ nullable: true })
  standardName: string
  @Field({ nullable: true })
  standardVersionNumber: string
  @Field({ nullable: true })
  startDate: string
  @Field({ nullable: true })
  status: string
  @Field({ nullable: true })
  ruleCount: number
  @Field({ nullable: true })
  errCount: number
}

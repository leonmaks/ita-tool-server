import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class VerificationRuleResult {
  @Field()
  id: string
  @Field()
  standardVerificationRunId: string
  @Field()
  ruleId: string
  @Field()
  ruleName: string
  @Field()
  regoRule: string
  @Field()
  message: string
  @Field()
  status: string
  @Field()
  reportMessage: string
  @Field()
  ruleDescription: string
  @Field()
  ruleArchitecturalRequirement: string
  @Field()
  uuid: string
  @Field({ nullable: true })
  finalStatus: string
  @Field({ nullable: true })
  daeDueDate: string
  @Field({ nullable: true })
  daeJiraLink: string
  @Field({ nullable: true })
  criticality: string
  @Field()
  isError: boolean
}

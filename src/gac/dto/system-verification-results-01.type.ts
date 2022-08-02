import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SystemVerificationResults01 {
  @Field({ nullable: true })
  asId: string
  @Field()
  asName: string
  @Field({ nullable: true })
  asType: string
  @Field({ nullable: true })
  guid: string
  @Field({ nullable: true })
  ciSm: string
  @Field({ nullable: true })
  ciType: string
  @Field()
  criticalityLevel: string
  @Field({ nullable: true })
  ownerBlock: string
  @Field({ nullable: true })
  ownerUnit: string
  @Field({ nullable: true })
  asArchitectDit: string
  @Field({ nullable: true })
  dkaSupervisingArchitect: string
  @Field({ nullable: true })
  blockArchitect: string
  @Field({ nullable: true })
  tribe: string
  @Field()
  wave: number
  @Field()
  connectedToGac: boolean
  @Field({ nullable: true })
  vrId: string
  @Field({ nullable: true })
  vrStatus: string
  @Field({ nullable: true })
  vrFinalStatus: string
  @Field({ nullable: true })
  vrStandardName: string
  @Field({ nullable: true })
  vrStandardVersion: string
  @Field({ nullable: true })
  verificationDate: string
  @Field({ nullable: true })
  ruleCount: number
  @Field({ nullable: true })
  errCount: number
}

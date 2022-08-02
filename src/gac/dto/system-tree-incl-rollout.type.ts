import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SystemTreeInclRollout {
  @Field()
  systemId: string
  @Field()
  systemName: string
  @Field()
  guid: string
  @Field({ nullable: true })
  ciSm: string
  @Field()
  systemTypeId: string
  @Field()
  systemTypeText: string
  @Field({ nullable: true })
  parentGuid: string
  @Field({ nullable: true })
  criticalityLevel: string
  @Field({ nullable: true })
  ownerBlock: string
  @Field({ nullable: true })
  ownerUnit: string
  @Field({ nullable: true })
  sysArchitectDit: string
  @Field({ nullable: true })
  entSupervisingArchitect: string
  @Field({ nullable: true })
  blockArchitect: string
  @Field({ nullable: true })
  tribe: string
  @Field({ nullable: true })
  wave: number
}

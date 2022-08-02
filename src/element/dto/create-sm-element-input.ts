import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSmElementInput {
  @Field()
  smCiCode: string

  @Field({ nullable: true })
  smType?: string

  @Field({ nullable: true })
  smSubtype?: string

  @Field({ nullable: true })
  smHpcStatus?: string

  @Field({ nullable: true })
  smEnvironment?: string

  @Field({ nullable: true })
  smName?: string

  @Field({ nullable: true })
  smIpAddressList?: string

  @Field({ nullable: true })
  smName2?: string

  @Field({ nullable: true })
  smJCpuProcCount?: string

  @Field({ nullable: true })
  smJCpuCount?: string

  @Field({ nullable: true })
  smJRam?: string

  @Field({ nullable: true })
  smJHdd?: string

  @Field({ nullable: true })
  smJSdd?: string

  @Field({ nullable: true })
  smTpsPlacement?: string
}

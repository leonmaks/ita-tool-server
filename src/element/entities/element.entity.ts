import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { AppPfx } from '../../app.config'
import { ElementType } from './elementType.entity'

@ObjectType()
@Entity(`${AppPfx}_element`)
export class Element {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  name: string

  // @Field(() => ID)
  // @Column()
  // elementTypeId: number

  // @Field(() => ElementType)
  // @ManyToOne(() => ElementType, { nullable: false })
  // elementType: ElementType

  // @Field({ nullable: true })
  // @Column({ nullable: true, unique: true })
  // guid?: string

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  smCiCode?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smType?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smSubtype?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smHpcStatus?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smEnvironment?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smName?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smIpAddressList?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smName2?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smJCpuProcCount?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smJCpuCount?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smJRam?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smJHdd?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smJSdd?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smJTpsPlacement?: string
}

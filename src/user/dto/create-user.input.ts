import { Field, InputType } from '@nestjs/graphql'
import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  username: string

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is weak'
  })
  password: string
}

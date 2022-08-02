import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { CreateUserInput } from './dto/create-user.input'
import { User } from './entities/user.entity'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { UserService } from './user.service'
import { CurrentUser } from '../auth/current-user.decorator'

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}


  @Query(() => [User])
  // @UseGuards(GqlAuthGuard)
  getAllUsers(@CurrentUser() user: User) {
    console.log('user=', user)
    return this.userService.findAll()
  }

  @Query(() => User)
  getUserByUsername(@Args('username') username: string) {
    return this.userService.findOneUser({ where: { username } })
  }

  // @Mutation(() => User)
  // createUser(
  //   @Args('createUserInput')
  //   createUserInput: CreateUserInput
  // ) {
  //   return this.userService.createUser(createUserInput)
  // }
}

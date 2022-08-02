import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { CreateUserInput } from '../user/dto/create-user.input'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
// import { UserCredentialsInput } from './dto/user-credentials.input'
// import { LoginResponse } from './dto/login-response.type'

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => User)
  register(
    @Args('createUserInput') createUserInput: CreateUserInput
  ) {
    return this.authService.register(createUserInput)
  }

  // @Mutation(() => LoginResponse)
  // login(
  //   @Args('authCredentialsInut')
  //   authCredentialsInput: UserCredentialsInput,
  // ) {
  //   return this.authService.login(authCredentialsInput)
  // }


  // @Resolver(() => Element)
  // export class ElementResolver {

  //   constructor(private elementService: ElementService) {}

  //   @Query(() => [Element])
  //   getAllElements() {
  //     return this.elementService.findAll()
  //   }

  //   @Query(() => Element)
  //   getOneElement(@Args('id') id: number) {
  //     return this.elementService.findOne(id)
  //   }

  //   @Mutation(() => Element)
  //   createElement(
  //     @Args('createElementInput')
  //     createElementInput: CreateElementInput
  //   ) {
  //     return this.elementService.create(createElementInput)
  //   }
  // }
}

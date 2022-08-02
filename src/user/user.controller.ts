import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { UserService } from './user.service'
// import { LocalAuthGuard } from './auth/local-auth.guard'
// import { User } from './user/entities/user.entity'

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  // @UseGuards(LocalAuthGuard)
  @Get('login')
  login(@Request() req: ExpressRequest) {
    return `Hello from login!`
    // return req.user
  }

  // @Get('protected')
  // getHello(): string {
  //   return this.appService.getHello()
  // }
}

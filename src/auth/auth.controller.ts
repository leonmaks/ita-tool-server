import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { IRequestWithUser } from './request-with-user.interface'
// import { UserCredentialsInput } from './dto/user-credentials.input'
import { CreateUserInput } from '../user/dto/create-user.input'
import { LocalAuthGuard } from './guards/local-auth.guard'
// import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserInput: CreateUserInput) {
    return this.authService.register(createUserInput)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: IRequestWithUser,
    // @Body() authCredentialsInput: UserCredentialsInput
  ) {
    console.log('AuthController-login')
    return this.authService.login(req.user)
    // return this.authService.login(authCredentialsInput)
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('protected')
  // protected(
  //   @Request()
  //   req: ExpressRequest
  // ): any {
  //   return req.user
  // }
}

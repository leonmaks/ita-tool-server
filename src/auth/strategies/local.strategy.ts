import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { User } from 'src/user/entities/user.entity'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    super()
  }

  validate = async (username: string, password: string) => {
    const user = await this.authService.validateUser({ username, password })
    if (!user) throw new UnauthorizedException()
    return user
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtSecretEnv } from '../../app.config'
import { UserService } from '../../user/user.service'
import { IJwtPayload } from '../jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(JwtSecretEnv),
      ignoreExpiration: false,
    })
  }

  validate = async ({ username }: IJwtPayload) => {
    const user = await this.userService.findOneUser({ where: { username } })
    if (!user) throw new UnauthorizedException()
    return user
  }
}

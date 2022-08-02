import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash as bcryptjsHash, compare, genSalt } from 'bcryptjs'

import { HashSaltRounds } from '../app.config'
import { CreateUserInput } from '../user/dto/create-user.input'
import { UserCredentialsInput } from './dto/user-credentials.input'
import { LoginResponse } from './dto/login-response.type'
import { IJwtPayload } from './jwt-payload.interface'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  register = async ({ password, ...other }: CreateUserInput) => (
    this.userService.createUser({
      ...other,
      password: await this.hash(password)
    })
  )

  validateUser = async (
    { username, password: password }: UserCredentialsInput,
  ): Promise<User | undefined> => {
    const user = await this.userService.getUserIncludingPassword({ username })
    if (user) {
      const { password: hash, ...rest } = user
      const passwordIsValid = await compare(password, hash)
      if (passwordIsValid) return rest
    }
    return undefined
  }

  login = (
    { username, id: sub }: User,
    // userCredentialsInput: UserCredentialsInput,
  ): LoginResponse => (
    { accessToken: this.jwtService.sign({ username, sub }) }
  )
  // {
  //   const jwtPayload: IJwtPayload = {
  //     username,
  //     sub,
  //   }
  //   return {
  //     accessToken: this.jwtService.sign({username, sub})
  //   }
  //   // } else {
  //   //   throw new UnauthorizedException('Please check your login credentials')
  //   // }
  // }

  // async validateUser(username: string, password: string): Promise<User | undefined> {
  //   const user = await this.userService.getUserIncludingPassword({ where: { username } })
  //   console.log('validateUser: user=', user)
  //   if (user && user.password === password) {
  //     const { password, ...result } = user
  //     // @ts-ignore
  //     return result
  //   }
  //   return undefined
  // }

  hash = async (password: string) => bcryptjsHash(password, await genSalt(HashSaltRounds))
}

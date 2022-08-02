import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { User } from '../user/entities/user.entity'

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => ctx.switchToHttp().getRequest().user
)

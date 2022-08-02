import { ConflictException } from '@nestjs/common'
import { EntityNotFoundError, EntityRepository, Repository } from 'typeorm'

import { TypeormWhereOptions, TypeormWhereParamenters } from '../typeorm.types'
import { CreateUserInput } from './dto/create-user.input'
import { User } from './entities/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser = async (createUserInput: CreateUserInput) => {
    let user = this.create(createUserInput)
    try {
      user = await this.save(user)
    } catch (exc) {
      // TODO: enum exception code ('23505' - Duplicate user)
      if (exc.code === '23505') throw new ConflictException(`Username '${createUserInput.username}' already exists`)
      throw exc
    }

    return user
  }

  getUserIncludingPassword = async (options: TypeormWhereOptions, parameters?: TypeormWhereParamenters): Promise<User | undefined> => {
    let user: User | undefined = undefined
    try {
      user = await this.createQueryBuilder('user').addSelect('user.password').where(options, parameters).getOneOrFail()
    } catch (error) {
      if (error instanceof EntityNotFoundError) user = undefined
      else throw error
    }
    return user
  }
}

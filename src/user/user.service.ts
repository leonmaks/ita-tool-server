import { Injectable } from '@nestjs/common'
import { FindOneOptions } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UserRepository } from './user.repository'
import { TypeormWhereOptions, TypeormWhereParamenters } from '../typeorm.types'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  // async add(user: any): Promise<any> {
  // 	return Promise.resolve().then(() => {
  // 		console.log('user added:', user)
  // 	})
  // }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOneUser = async (options: FindOneOptions<User>) => (
    this.userRepository.findOne(options)
  )

  getUserIncludingPassword = async (
    options: TypeormWhereOptions,
    parameters?: TypeormWhereParamenters,
  ): Promise<User | undefined> => (
    this.userRepository.getUserIncludingPassword(options, parameters)
  )

  createUser = async (createUserInput: CreateUserInput) => (
    this.userRepository.createUser(createUserInput)
  )
}

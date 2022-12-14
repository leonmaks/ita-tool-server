import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserRepository,
		]),
	],
	providers: [
		UserService, UserResolver,
	],
	controllers: [
		UserController
	],
	exports: [
		UserService
	]
})
export class UserModule {}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { Element } from './entities/element.entity'
import { CreateElementInput } from './dto/create-element.input'
import { ElementService } from './element.service'

@Resolver(() => Element)
export class ElementResolver {

	constructor(private elementService: ElementService) {}

	@Query(() => [Element])
	getAllElements() {
		return this.elementService.findAll()
	}

	@Query(() => Element)
	getOneElement(@Args('id') id: string) {
		return this.elementService.findOne(id)
	}

	@Mutation(() => Element)
	createElement(
		@Args('createElementInput')
		createElementInput: CreateElementInput
	) {
		return this.elementService.create(createElementInput)
	}
}

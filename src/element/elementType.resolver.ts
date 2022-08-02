import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { ElementType } from './entities/elementType.entity'
import { CreateElementTypeInput } from './dto/create-elementType.input'
import { ElementTypeService } from './elementType.service'

@Resolver(() => ElementType)
export class ElementTypeResolver {

	constructor(private elementTypeService: ElementTypeService) {}

	@Query(() => [ElementType])
	getAllElementTypes() {
		return this.elementTypeService.findAll()
	}

	@Mutation(() => ElementType)
	createElementType(
		@Args('createElementTypeInput')
		createElementTypeInput: CreateElementTypeInput
	) {
		return this.elementTypeService.create(createElementTypeInput)
	}
}

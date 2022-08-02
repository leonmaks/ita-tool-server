import { Field, InputType, ID } from '@nestjs/graphql'

@InputType()
export class CreateElementTypeInput {

	@Field(type => ID)
	id: number

	@Field()
	name: string
}

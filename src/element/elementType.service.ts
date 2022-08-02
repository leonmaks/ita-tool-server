import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { ElementType } from './entities/elementType.entity'
import { CreateElementTypeInput } from './dto/create-elementType.input'

@Injectable()
export class ElementTypeService {
	constructor(@InjectRepository(ElementType) private elementTypeRepository: Repository<ElementType>) {}

	async findAll(): Promise<ElementType[]> {
		return this.elementTypeRepository.find()
	}

	async create(elementType: CreateElementTypeInput): Promise<ElementType> {
		let et_ = this.elementTypeRepository.create(elementType)
		return this.elementTypeRepository.save(et_)
	}
}

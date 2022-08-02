import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
// import snake from 'snakecase-keys'

import { Element } from './entities/element.entity'
import { CreateElementInput } from './dto/create-element.input'
import { CreateSmElementInput } from './dto/create-sm-element-input'

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
  ) {}

  async findAll(): Promise<Element[]> {
    return null
    // return this.elementRepository.find({
    //   relations: ['elementType'],
    // })
  }

  async findOne(id: string): Promise<Element> {
    return null
    // return this.elementRepository.findOne({ where: { id } })
  }

  async create(element: CreateElementInput): Promise<Element> {
    return null
    // console.log('element=', objSnakeCase(element))

    // const el_ = this.elementRepository.create(element)
    // // let el_ = this.elementRepository.create(objSnakeCase(element))
    // return this.elementRepository.save(el_)
  }

  async bulkImpSm(elements: CreateSmElementInput[]): Promise<void> {
    for await (const el of elements) {
      const el_ = this.elementRepository.create(el)
      console.log('el=', await this.elementRepository.save(el_))
    }

    // await this.elementRepository.createQueryBuilder('element').insert().values(elements).execute()
    // .orIgnore().execute()
    // this.articleRepository             .createQueryBuilder().insert().values(articles).onConflict(("_key") DO NOTHING).execute()
  }
}

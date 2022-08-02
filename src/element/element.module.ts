import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Element } from './entities/element.entity'
import { ElementType } from './entities/elementType.entity'
import { ElementService } from './element.service'
import { ElementTypeService } from './elementType.service'
import { ElementResolver } from './element.resolver'
import { ElementTypeResolver } from './elementType.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Element, ElementType])],
  providers: [ElementService, ElementResolver, ElementTypeService, ElementTypeResolver],
  exports: [ElementService],
})
export class ElementModule {}

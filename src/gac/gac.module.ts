import { Module } from '@nestjs/common';
import { GacService } from './gac.service';
import { GacResolver } from './gac.resolver';

@Module({
  providers: [GacService, GacResolver]
})
export class GacModule {}

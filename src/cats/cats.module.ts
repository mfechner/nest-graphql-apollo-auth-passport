import { Module } from '@nestjs/common';
import { CatsResolvers } from './cats.resolvers';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
    controllers: [ CatsController ],
  providers: [CatsService, CatsResolvers],
})
export class CatsModule {}

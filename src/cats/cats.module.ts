import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CatsResolvers } from './cats.resolvers';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CatsController],
  providers: [
    CatsService,
    CatsResolvers,
  ],
})
export class CatsModule {
}

import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtStrategy } from './auth/jwt.strategy';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwksRsaModule } from './jwks-rsa/jwks-rsa.module';
import { ObjectidScalar } from './common/scalars/objectid.scalar';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    JwksRsaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: {
        expiresIn: 3600,
      },
    }),
    CatsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ request: req }),
    }),
  ],
  providers: [
    ObjectidScalar,
    Logger,
    JwtStrategy,
  ],
})
export class ApplicationModule {
}

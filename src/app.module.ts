import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwksRsaModule } from './jwks-rsa/jwks-rsa.module';
import { ObjectidScalar } from './common/scalars/objectid.scalar';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AuthModule,
        UserModule,
        JwksRsaModule,
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
    ],
})
export class ApplicationModule {
}

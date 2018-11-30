import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Module({
    imports : [
        UserModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        UserService,
    ],
    exports: [
        AuthService,
    ],
})
export class AuthModule {
}
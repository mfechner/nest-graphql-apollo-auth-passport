import { Module } from '@nestjs/common';
import { JwksRsaController } from './jwks-rsa.controller';

@Module({
    imports: [
    ],
    controllers: [
        JwksRsaController,
    ],
    providers: [
    ],
    exports: [
    ],
})
export class JwksRsaModule {

}

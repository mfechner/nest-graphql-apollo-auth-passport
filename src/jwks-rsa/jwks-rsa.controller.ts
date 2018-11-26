import { Body, Controller, Get, HttpStatus, Logger, Response } from '@nestjs/common';
import * as rsaPemToJwk from 'rsa-pem-to-jwk';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Controller('.well-known')
export class JwksRsaController {
    private logger = new Logger(JwksRsaController.name);

    constructor() {
    }

    @Get('jwks.json')
    async jwks(@Response() res: any, @Body() body) {
        // @TODO Read all keys existing, find a way to expire them and delete them after a certain time
        this.logger.log('jwks-rsa called');
        const jwk = [];
        const publicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'public.pem'));
        const keyid = crypto.createHash('sha256').update(publicKey).digest('hex');
        jwk.push(rsaPemToJwk(publicKey, { use: 'sig', alg: 'RSA256', kid: keyid }, 'public'));

        return res.status(HttpStatus.OK).json({ keys: jwk });
    }
}

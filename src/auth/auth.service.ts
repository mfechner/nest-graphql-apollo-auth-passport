import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);
    expiresIn = 3600;
    RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'private.pem'));
    RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'public.pem'));

    constructor(private userService: UserService) {}

    // @todo implement secretKey and exiresIn as custom providers
    async createToken(username: string) {
        this.logger.log('create Token');
        const user: JwtPayload = { username };
        const keyid = crypto.createHash('sha256').update(this.RSA_PUBLIC_KEY).digest('hex');

        const token = jwt.sign({}, this.RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: this.expiresIn,
            subject: username,
            keyid,
        });
        return {
            expiresIn: this.expiresIn,
            token,
        };
    }

    async validateUser(signedUser): Promise<boolean> {
        this.logger.log('validate user:');
        this.logger.log(signedUser);
        if (signedUser && signedUser.sub) {
            return Boolean(this.userService.getUserByUsername(signedUser.sub));
        }
        return false;
    }
}
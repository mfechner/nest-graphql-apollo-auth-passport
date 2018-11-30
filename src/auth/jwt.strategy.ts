import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import * as jwtDecode from 'jwt-decode';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger(JwtStrategy.name);

    // @TODO use here a global secret key
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKeyProvider: (request, jwt, result) => {
                // @TODO move URL to a better location
                const client = jwksRsa({
                    strictSsl: false,
                    jwksUri: 'http://localhost:3000/.well-known/jwks.json',
                    cache: true,
                    jwksRequestsPerMinute: 2,
                });
                this.logger.log('decode received token');
                this.logger.log(jwt);
                const keyKid = 'kid';
                const kid = jwtDecode(jwt, { header: true})[keyKid];
                client.getSigningKey(kid, (err, key) => {
                    if (err) {
                        this.logger.log('Error happened in getSigningKey, could not find the public key');
                        return result(null, null);
                    }

                    result(null, key.rsaPublicKey || key.publicKey);
                });
            },
        });
        this.logger.log('constructor in JwtStrategy called');
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            this.logger.log('JWT check failed');
            throw new UnauthorizedException();
        }
        this.logger.log('JWT check passed');
        this.logger.log(payload);
        return user;
    }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
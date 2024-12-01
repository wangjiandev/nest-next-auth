import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret,
            ignoreExpiration: false,
        });
    }
}

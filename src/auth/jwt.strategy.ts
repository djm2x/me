import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Payload } from './payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY || 'somethingyouwantwhichissecurewillworkk',
      // passReqToCallback: true,
      ignoreExpiration: false,
      expiresIn: process.env.EXPIRESIN  || '365d'
    });
  }

  validate(payload: Payload) {
    return payload;
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Connection } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER_TYPE_KEY } from 'src/common/constants';
import { PersonsService } from 'src/persons/persons.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectConnection() private connection: Connection,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    req[USER_TYPE_KEY] = payload[USER_TYPE_KEY];

    return await this.connection
      .model(payload[USER_TYPE_KEY])
      .findById(payload['sub'])
      .exec()
      .then((doc) => {
        const user = doc.toObject();
        if (user._id) user._id = user._id.toHexString();
        return user;
      });
  }
}

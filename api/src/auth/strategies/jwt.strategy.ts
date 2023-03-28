import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Connection } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER_TYPE_KEY } from 'src/common/constants';
import { UsersService } from 'src/users/users.service';

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
    });
  }

  async validate(payload: any) {
    return await this.connection
      .model(payload[USER_TYPE_KEY])
      .findById(payload['sub'])
      .exec()
      .then((doc) =>
        doc.toObject({
          transform: (doc, ret, opts) => {
            ret._id = ret._id.toHexString();
            return ret;
          },
        }),
      );
  }
}

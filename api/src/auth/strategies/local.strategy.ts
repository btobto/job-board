import { Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { USER_TYPE_KEY } from 'src/common/constants';
import { AuthService } from '../auth.service';
import { UserType } from '../../common/enums';
import { User } from 'src/common/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(
    req: Request,
    email: string,
    password: string,
  ): Promise<Omit<User, 'hashedPassword'>> {
    const user = await this.authService.validateUser(
      email,
      password,
      req[USER_TYPE_KEY],
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }
}

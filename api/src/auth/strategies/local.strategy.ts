import { Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Role } from '../enums';
import { USER_TYPE_KEY } from '../guards';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
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

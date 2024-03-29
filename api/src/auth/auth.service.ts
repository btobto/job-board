import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { USER_TYPE_KEY } from 'src/common/constants';
import { CompanyCreateDto } from 'src/companies/dto';
import { Company } from 'src/companies/schemas';
import { PersonCreateDto } from 'src/persons/dto';
import { Person } from 'src/persons/schemas';
import { UserType } from '../common/enums';
import { HashingService } from './hashing';
import { User } from 'src/common/types';
import { JwtPayload } from './models';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private connection: Connection,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, userType: UserType) {
    const user = await this.connection.model(userType).findOne({ email }).exec();

    if (!user || !(await this.hashingService.compare(password, user.hashedPassword))) {
      return null;
    }

    return user.toJSON();
  }

  login(user: Omit<User, 'hashedPassword'>, userType: UserType) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user._id,
      [USER_TYPE_KEY]: userType,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(dto: PersonCreateDto | CompanyCreateDto, userType: UserType) {
    const hashedPassword = await this.hashingService.hash(dto.password);

    const user: Omit<User, 'hashedPassword'> = await this.connection
      .model(userType)
      .create({
        ...dto,
        hashedPassword,
      })
      .then((doc) => doc.toJSON());

    return this.login(user, userType);
  }
}

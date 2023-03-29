import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { USER_TYPE_KEY } from 'src/common/constants';
import { CompanyCreateDto } from 'src/companies/dto';
import { Company } from 'src/companies/schemas';
import { UserCreateDto } from 'src/users/dto';
import { User } from 'src/users/schemas';
import { Role } from './enums';
import { HashingService } from './hashing';

type UserType = User | Company;

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private connection: Connection,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, userType: Role.User) {
    const user: UserType = await this.connection
      .model(userType)
      .findOne({ email })
      .lean()
      .exec();

    if (
      !user ||
      !(await this.hashingService.compare(password, user.hashedPassword))
    ) {
      return null;
    }

    const { hashedPassword, ...result } = user;
    return result;
  }

  async login(user: UserType, userType: Role) {
    const payload = {
      email: user.email,
      sub: user._id,
      [USER_TYPE_KEY]: userType,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(dto: UserCreateDto | CompanyCreateDto) {
    const modelName = dto instanceof UserCreateDto ? Role.User : Role.Company;

    const hashedPassword = await this.hashingService.hash(dto.password);

    await this.connection.model(modelName).create({
      ...dto,
      hashedPassword,
    });
  }
}

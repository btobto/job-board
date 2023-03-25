import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateDto, UserLoginDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { HashingService } from '../hashing/hashing.service';
import { MongoServerError } from 'mongodb';
import { MongoErrorCodes } from 'src/common/constants';
import { JwtService } from '@nestjs/jwt/dist';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: UserCreateDto) {
    try {
      registerDto.password = await this.hashingService.hash(
        registerDto.password,
      );

      await this.usersService.create(registerDto);
    } catch (error) {
      // exception filter?
      if (
        error instanceof MongoServerError &&
        error.code === MongoErrorCodes.DUPLICATE_KEY
      ) {
        throw new ConflictException();
      }
      throw error;
    }
  }

  async login(loginDto: UserLoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    console.log(user);

    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    const isEqual = await this.hashingService.compare(
      loginDto.password,
      user.hashedPassword,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect Password');
    }

    const accessToken = await this.jwtService.sign({
      sub: user._id.toHexString(),
      email: user.email,
    });

    // console.log(user as unknown as Document<User>);
    // console.log((user as unknown as Document<User>).toObject());

    return {
      ...user,
      accessToken,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/users/dto';
import { User } from 'src/users/schemas';
import { UsersService } from 'src/users/users.service';
import { HashingService } from './hashing';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (
      !user ||
      !(await this.hashingService.compare(password, user.hashedPassword))
    ) {
      return null;
    }

    const { hashedPassword, ...result } = user;
    return result;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user._id }; // to hex string?
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: UserCreateDto) {}
}

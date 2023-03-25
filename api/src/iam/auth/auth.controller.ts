import { Body, Controller, HttpStatus } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { UserCreateDto, UserLoginDto } from 'src/users/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/register')
  register(@Body() registerDto: UserCreateDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('local/login')
  login(@Body() loginDto: UserLoginDto) {
    return this.authService.login(loginDto);
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserCreateDto } from 'src/users/dto';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('local/register')
  register(@Body() dto: UserCreateDto) {
    return this.authService.register(dto);
  }
}

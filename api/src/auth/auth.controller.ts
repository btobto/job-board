import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DisableToObject } from 'src/common/decorators';
import { CompanyCreateDto } from 'src/companies/dto';
import { UserCreateDto } from 'src/users/dto';
import { User } from 'src/users/schemas';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { Role } from './enums';
import { LocalAuthGuard, USER_TYPE_KEY } from './guards';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard(Role.User))
  @Post('user/login')
  loginUser(@Request() req) {
    return this.authService.login(req['user'], req[USER_TYPE_KEY]);
  }

  @Post('user/register')
  register(@Body() dto: UserCreateDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard(Role.Company))
  @Post('company/login')
  loginCompany(@Request() req) {
    return this.authService.login(req['user'], req[USER_TYPE_KEY]);
  }

  @Post('company/register')
  companyRegister(@Body() dto: CompanyCreateDto) {
    return this.authService.register(dto);
  }
}

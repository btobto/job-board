import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { USER_TYPE_KEY } from 'src/common/constants';
import { CompanyCreateDto } from 'src/companies/dto';
import { PersonCreateDto } from 'src/persons/dto';
import { AuthService } from './auth.service';
import { ActiveUser, Public } from './decorators';
import { UserType } from '../common/enums';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { User } from 'src/common/types';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public(false)
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Request() req) {
    return this.authService.stripPassword(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard(UserType.Person))
  @Post('person/login')
  loginPerson(@Request() req) {
    return this.authService.login(req['user'], req[USER_TYPE_KEY]);
  }

  @Post('person/register')
  registerPerson(@Body() dto: PersonCreateDto) {
    return this.authService.register(dto, UserType.Person);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard(UserType.Company))
  @Post('company/login')
  loginCompany(@Request() req) {
    return this.authService.login(req['user'], req[USER_TYPE_KEY]);
  }

  @Post('company/register')
  registerCompany(@Body() dto: CompanyCreateDto) {
    return this.authService.register(dto, UserType.Company);
  }
}

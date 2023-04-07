import {
  Body,
  Controller,
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
import { Public } from './decorators';
import { UserType } from '../common/enums';
import { LocalAuthGuard } from './guards';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  companyRegister(@Body() dto: CompanyCreateDto) {
    return this.authService.register(dto, UserType.Company);
  }
}

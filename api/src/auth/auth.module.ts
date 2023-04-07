import { Module } from '@nestjs/common';
import { PersonsModule } from 'src/persons/persons.module';
import { AuthService } from './auth.service';
import { HashingService, BcryptService } from './hashing';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LocalStrategy, JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompaniesModule } from 'src/companies/companies.module';
import { JwtConfigService } from 'src/config';

@Module({
  imports: [
    PersonsModule,
    CompaniesModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

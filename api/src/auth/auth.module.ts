import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { HashingService, BcryptService } from './hashing';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LocalStrategy, JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [
    UsersModule,
    CompaniesModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_TTL'),
        },
      }),
      inject: [ConfigService],
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

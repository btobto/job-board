import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './companies/companies.module';
import { PostingsModule } from './postings/postings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PersonsModule } from './persons/persons.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards';
import { DocumentToObjectInterceptor } from './common/interceptors';
import { MongooseConfigService } from './config';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './config/multer-config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    PersonsModule,
    CompaniesModule,
    PostingsModule,
    ReviewsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DocumentToObjectInterceptor,
    },
  ],
})
export class AppModule {}

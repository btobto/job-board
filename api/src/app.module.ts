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
import { MongooseConfigService } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FILE_UPLOAD_DEST } from './common/constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', `${FILE_UPLOAD_DEST}`),
      serveRoot: `/${FILE_UPLOAD_DEST}`,
      serveStaticOptions: { index: false },
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
  ],
})
export class AppModule {}

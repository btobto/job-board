import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new MongoExceptionFilter());
  mongoose.set('runValidators', true);

  app.enableCors();
  const host = configService.get<string>('HOST') || 'localhost';
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(3000);

  Logger.log(`🚀 Application is running on: http://${host}:${port}`);
}

bootstrap();

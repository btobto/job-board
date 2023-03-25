import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './companies/companies.module';
import { PostingsModule } from './postings/postings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { IamModule } from './iam/iam.module';
import { Connection, connection } from 'mongoose';
import { stripObjectPlugin, leanAndStripQueryPlugin } from './common/plugins';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        user: configService.get<string>('DB_USER'),
        pass: configService.get<string>('DB_PASSWORD'),
        dbName: configService.get<string>('DB_NAME'),
        connectionFactory: (connection: Connection) => {
          connection.plugin(stripObjectPlugin);
          connection.plugin(leanAndStripQueryPlugin);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CompaniesModule,
    PostingsModule,
    ReviewsModule,
    IamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

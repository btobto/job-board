import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posting, PostingSchema } from './schemas';
import { PostingsService } from './postings.service';
import { PostingsController } from './postings.controller';
import { JwtModule } from '@nestjs/jwt';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posting.name, schema: PostingSchema }]),
    JwtModule,
    PersonsModule,
  ],
  providers: [PostingsService],
  exports: [PostingsService],
  controllers: [PostingsController],
})
export class PostingsModule {}

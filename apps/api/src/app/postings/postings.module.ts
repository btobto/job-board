import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posting, PostingSchema } from './schemas';
import { PostingsService } from './postings.service';
import { PostingsController } from './postings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posting.name, schema: PostingSchema }]),
  ],
  providers: [PostingsService],
  exports: [PostingsService],
  controllers: [PostingsController],
})
export class PostingsModule {}

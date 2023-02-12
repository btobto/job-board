import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posting, PostingSchema } from './schemas/posting.schema';
import { PostingsService } from './postings.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posting.name, schema: PostingSchema }]),
  ],
  providers: [PostingsService],
  exports: [PostingsService],
})
export class PostingsModule {}

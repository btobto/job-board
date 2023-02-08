import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posting, PostingSchema } from './schemas/posting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posting.name, schema: PostingSchema }]),
  ],
})
export class PostingsModule {}

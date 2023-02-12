import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posting, PostingDocument } from './schemas/posting.schema';

@Injectable()
export class PostingsService {
  constructor(
    @InjectModel(Posting.name) private postingModel: Model<PostingDocument>
  ) {}

  async deleteAll(companyId: string) {
    return await this.postingModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .exec();
  }
}

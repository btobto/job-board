import { PostingCreateDto, PostingUpdateDto } from '@nbp-it-job-board/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posting, PostingDocument } from './schemas/posting.schema';

@Injectable()
export class PostingsService {
  constructor(
    @InjectModel(Posting.name) private postingModel: Model<PostingDocument>
  ) {}

  async create(companyId: string, dto: PostingCreateDto): Promise<Posting> {
    return await this.postingModel
      .create({ ...dto, company: companyId })
      .catch((e) => {
        throw e;
      });
  }

  async findById(id: string): Promise<Posting> {
    return await this.postingModel.findById(id).exec();
  }

  async findAllCompanyPostings(companyId: string): Promise<Posting[]> {
    return await this.postingModel
      .find()
      .where('company')
      .equals(companyId)
      .exec();
  }

  async update(id: string, dto: PostingUpdateDto): Promise<Posting> {
    return await this.postingModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async delete(id: string) {
    return await this.postingModel.findByIdAndDelete(id).exec();
  }

  async deleteAllCompanyPostings(companyId: string) {
    return await this.postingModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .exec();
  }
}

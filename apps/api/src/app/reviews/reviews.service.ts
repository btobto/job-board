import { ReviewCreateDto, ReviewUpdateDto } from '@nbp-it-job-board/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>
  ) {}

  async create(dto: ReviewCreateDto): Promise<Review> {
    return await this.reviewModel.create(dto).catch((e) => {
      throw e;
    });
  }

  async findById(id: string): Promise<Review> {
    return await this.reviewModel.findById(id).exec();
  }

  async update(id: string, dto: ReviewUpdateDto): Promise<Review> {
    return await this.reviewModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
  }

  async delete(id: string) {
    return await this.reviewModel.findByIdAndRemove(id).exec();
  }

  async deleteAll(companyId: string) {
    return await this.reviewModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .exec();
  }
}

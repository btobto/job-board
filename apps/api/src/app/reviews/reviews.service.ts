import {
  ReviewCreateDto,
  ReviewUpdateDto,
} from '@nbp-it-job-board/models/review';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>
  ) {}

  create(companyId: string, dto: ReviewCreateDto): Promise<Review> {
    return this.reviewModel.create({
      ...dto,
      company: companyId,
      user: dto.userId,
    });
  }

  findById(id: string): Promise<Review> {
    return this.reviewModel.findById(id).exec();
  }

  findAllCompanyReviews(companyId: string): Promise<Review[]> {
    return this.reviewModel.where('company').equals(companyId).exec();
  }

  update(dto: ReviewUpdateDto): Promise<Review> {
    return this.reviewModel
      .findOneAndUpdate(
        { company: dto.companyId, user: dto.userId },
        { ...dto, dateUpdated: Date.now() },
        { new: true }
      )
      .orFail()
      .exec();
  }

  async delete(id: string) {
    await this.reviewModel.findByIdAndDelete(id).orFail().exec();
  }

  deleteAllCompanyReviews(companyId: string) {
    return this.reviewModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .exec();
  }
}

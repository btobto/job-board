import {
  ReviewCreateDto,
  ReviewUpdateDto,
} from '@nbp-it-job-board/models/review';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Error, Model } from 'mongoose';
import { CompaniesService } from '../companies/companies.service';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>
  ) {}

  async create(companyId: string, dto: ReviewCreateDto): Promise<Review> {
    const review = await this.reviewModel
      .create({ ...dto, company: companyId, user: dto.userId })
      .catch((err) => {
        throw err;
      });

    return review;
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
      .exec();
  }

  delete(id: string) {
    this.reviewModel
      .findByIdAndDelete(id)
      .exec()
      .catch((err) => {
        throw err;
      });
  }

  deleteAllCompanyReviews(companyId: string) {
    return this.reviewModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .exec();
  }
}

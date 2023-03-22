import {
  ReviewCreateDto,
  ReviewUpdateDto,
} from '@nbp-it-job-board/models/review';
import { Injectable, Scope } from '@nestjs/common';
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
    return this.reviewModel.findById(id).orFail().exec();
  }

  findAllCompanyReviews(companyId: string): Promise<Review[]> {
    return this.reviewModel.where('company').equals(companyId).exec();
  }

  update(dto: ReviewUpdateDto): Promise<Review> {
    const now = new Date();

    return this.reviewModel
      .findOneAndUpdate(
        { company: dto.companyId, user: dto.userId },
        { ...dto, dateUpdated: now },
        {
          new: false,
          $locals: {
            newRating: dto.rating,
          },
        }
      )
      .orFail()
      .lean()
      .exec()
      .then((doc) => {
        return {
          ...doc,
          rating: dto.rating,
          description: dto.description,
          dateUpdated: now,
        };
      });
  }

  delete(id: string) {
    return this.reviewModel.findByIdAndDelete(id).orFail().exec();
  }

  deleteAllCompanyReviews(companyId: string) {
    return this.reviewModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .exec();
  }
}

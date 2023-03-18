import {
  ReviewCreateDto,
  ReviewUpdateDto,
} from '@nbp-it-job-board/models/review';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompaniesService } from '../companies/companies.service';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @Inject(forwardRef(() => CompaniesService))
    private companiesService: CompaniesService
  ) {}

  create(companyId: string, dto: ReviewCreateDto): Promise<Review> {
    return this.reviewModel
      .create({
        ...dto,
        company: companyId,
        user: dto.userId,
      })
      .then((doc) => {
        this.companiesService.updateCompanyRating(
          doc.company.toString(),
          doc.rating
        );
        return doc;
      });
  }

  findById(id: string): Promise<Review> {
    return this.reviewModel.findById(id).orFail().exec();
  }

  findAllCompanyReviews(companyId: string): Promise<Review[]> {
    return this.reviewModel.where('company').equals(companyId).exec();
  }

  update(dto: ReviewUpdateDto): Promise<Review> {
    return this.reviewModel
      .findOneAndUpdate(
        { company: dto.companyId, user: dto.userId },
        { ...dto, dateUpdated: Date.now() },
        { new: false }
      )
      .orFail()
      .lean()
      .exec()
      .then((doc) => {
        if (doc.rating != dto.rating) {
          this.companiesService.updateReviewRating(
            doc.company.toString(),
            dto.rating,
            doc.rating
          );
        }

        return { ...doc, rating: dto.rating, description: dto.description };
      });
  }

  async delete(id: string) {
    await this.reviewModel
      .findByIdAndDelete(id)
      .orFail()
      .exec()
      .then((doc) => {
        this.companiesService.updateCompanyRating(
          doc.company.toString(),
          doc.rating,
          true
        );
      });
  }

  async deleteAllCompanyReviews(companyId: string) {
    await this.reviewModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .exec();
  }
}

import { ReviewCreateDto, ReviewUpdateDto } from '@nbp-it-job-board/models';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompaniesService } from '../companies/companies.service';
import { Company, CompanyDocument } from '../companies/schemas/company.schema';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @Inject(forwardRef(() => CompaniesService))
    private companiesService: CompaniesService
  ) {}

  async create(companyId: string, dto: ReviewCreateDto): Promise<Review> {
    const review = await this.reviewModel
      .create({ ...dto, company: companyId, user: dto.userId })
      .catch((err) => {
        throw err;
      });

    if (review) {
      this.companiesService.updateRating(companyId, dto.rating);
    }

    return review;
  }

  async findById(id: string): Promise<Review> {
    return await this.reviewModel.findById(id).exec();
  }

  async findAllCompanyReviews(companyId: string): Promise<Review[]> {
    return await this.reviewModel
      .find()
      .where('company')
      .equals(companyId)
      .exec();
  }

  async update(dto: ReviewUpdateDto): Promise<Review> {
    return await this.reviewModel.findOneAndUpdate(
      { company: dto.companyId, user: dto.userId },
      { ...dto, datePosted: Date.now },
      { new: true }
    );
  }

  async delete(id: string) {
    return await this.reviewModel.findByIdAndDelete(id).exec();
  }

  async deleteAll(companyId: string) {
    return await this.reviewModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .exec();
  }
}

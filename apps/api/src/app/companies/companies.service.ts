import {
  CompanyCreateDto,
  CompanySearchQueryDto,
  CompanyUpdateDto,
} from '@nbp-it-job-board/models/company';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Error, Model } from 'mongoose';
import { PostingsService } from '../postings/postings.service';
import { ReviewsService } from '../reviews/reviews.service';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @Inject(forwardRef(() => ReviewsService))
    private reviewsService: ReviewsService,
    private postingsService: PostingsService
  ) {}

  async updateReviewRating(
    companyId: string,
    newRating: number,
    oldRating: number
  ) {
    const company = await this.companyModel.findById(companyId).exec();
    company.ratingsSum += newRating - oldRating;
    await company.save();
  }

  async updateCompanyRating(
    id: string,
    reviewRating: number,
    deleteRating = false
  ) {
    const company = await this.companyModel.findById(id).exec();
    company.ratingsCount += deleteRating ? -1 : 1;
    company.ratingsSum += deleteRating ? -reviewRating : reviewRating;
    await company.save();
  }

  create(dto: CompanyCreateDto): Promise<Company> {
    return this.companyModel.create(dto);
  }

  findById(id: string): Promise<Company> {
    return this.companyModel.findById(id).orFail().exec();
  }

  findByEmail(email: string): Promise<Company> {
    return this.companyModel.findOne({ email }).orFail().exec();
  }

  search(queryDto: CompanySearchQueryDto): Promise<Company[]> {
    const match: Record<string, any> = {};

    if (queryDto.name) {
      match['name'] = { $regex: '^' + queryDto.name, $options: 'i' };
    }
    if (queryDto.rating) {
      match['rating'] = { $gte: queryDto.rating };
    }

    console.log(match);

    return this.companyModel
      .aggregate()
      .addFields({
        rating: {
          $cond: [
            { $eq: ['$ratingsCount', 0] },
            0,
            { $divide: ['$ratingsSum', '$ratingsCount'] },
          ],
        },
      })
      .match(match)
      .sort({ rating: -1 })
      .limit(10)
      .exec();
  }

  update(id: string, dto: CompanyUpdateDto): Promise<Company> {
    return this.companyModel
      .findByIdAndUpdate(id, dto, { new: true })
      .orFail()
      .exec();
  }

  delete(id: string) {
    this.companyModel
      .findByIdAndDelete(id)
      .orFail()
      .exec()
      .then(() => {
        this.postingsService.deleteAllCompanyPostings(id);
        this.reviewsService.deleteAllCompanyReviews(id);
      });
  }
}

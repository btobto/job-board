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

  create(dto: CompanyCreateDto): Promise<Company> {
    return this.companyModel.create(dto).catch((e) => {
      throw e;
    });
  }

  async updateRating(
    id: string | mongoose.Types.ObjectId,
    rating: number,
    decrement = false
  ) {
    const company = await this.companyModel.findById(id).exec();
    company.ratingsCount += decrement ? -1 : 1;
    company.ratingsSum += decrement ? -rating : rating;
    await company.save();
  }

  findById(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }

  findByEmail(email: string): Promise<Company> {
    return this.companyModel.findOne({ email }).exec();
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
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
  }

  delete(id: string) {
    this.companyModel
      .findByIdAndDelete(id)
      .exec()
      .then((c) => {
        if (!c) throw new Error.DocumentNotFoundError("Document doesn't exist");
        this.postingsService.deleteAllCompanyPostings(c.id);
        this.reviewsService.deleteAllCompanyReviews(c.id);
      })
      .catch((e) => {
        throw e;
      });
  }
}

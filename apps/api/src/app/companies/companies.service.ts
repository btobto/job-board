import {
  CompanyCreateDto,
  CompanySearchQueryDto,
  CompanyUpdateDto,
} from '@nbp-it-job-board/models';
import {
  forwardRef,
  Inject,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
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

  async create(dto: CompanyCreateDto): Promise<Company> {
    return await this.companyModel.create(dto).catch((e) => {
      throw e;
    });
  }

  async updateRating(id: string, rating: number) {
    const company = await this.companyModel.findById(id);
    company.ratingsCount += 1;
    company.ratingsSum += rating;
    await company.save();
  }

  async findById(id: string): Promise<Company> {
    return await this.companyModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<Company> {
    return await this.companyModel.findOne({ email }).exec();
  }

  async search(queryDto: CompanySearchQueryDto): Promise<Company[]> {
    let query: Record<string, any> = {};

    if (queryDto.name) {
      query['name'] = { $regex: queryDto.name + '.*' };
    }
    if (queryDto.location) {
      query['location.country'] = queryDto.location.country;

      if (queryDto.location.city) {
        query['location.city'] = queryDto.location.city;
      }
    }
    if (queryDto.rating) {
      // query['']
    }

    throw new NotImplementedException();

    // let match: Record<string, any> = {};

    // if (queryDto.name) {
    //   match['name'] = { $regex: queryDto.name + '.*' };
    // }
    // if (queryDto.location) {
    //   match['location.country'] = queryDto.location.country;

    //   if (queryDto.location.city) {
    //     match['location.city'] = queryDto.location.city;
    //   }
    // }

    // let fields: Record<string, any> = {};
    // if (queryDto.rating) {
    //   fields['rating'] = { $divide: ['$ratingsSum', '$ratingsCount'] };
    // }

    // console.log(match);

    // console.log(query);

    // return await this.companyModel.find(query).limit(10).exec();
  }

  async update(id: string, dto: CompanyUpdateDto): Promise<Company> {
    return await this.companyModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
  }

  async delete(id: string) {
    await this.companyModel
      .findByIdAndDelete(id)
      .exec()
      .then((c) => {
        if (!c) throw new Error.DocumentNotFoundError("Document doesn't exist");
        this.postingsService.deleteAllCompanyPostings(c.id);
        this.reviewsService.deleteAll(c.id);
      })
      .catch((e) => {
        throw e;
      });
  }
}

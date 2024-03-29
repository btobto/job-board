import { CompanyCreateDto, CompanySearchQueryDto, CompanyUpdateDto, Rating } from './dto';
import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Error, Model } from 'mongoose';
import { transactionHandler } from '../common/mongoose-helpers';
import { Company, CompanyDocument } from './schemas';
import { unlink } from 'fs/promises';
import { COMPANY_ADD_RATING_FIELD, COMPANY_REMOVE_FIELDS } from 'src/common/constants';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  findById(id: string): Promise<Company> {
    return this.companyModel.findById(id).orFail().exec();
  }

  findByEmail(email: string): Promise<Company> {
    return this.companyModel.findOne({ email }).lean().exec();
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
      .addFields(COMPANY_ADD_RATING_FIELD)
      .match(match)
      .sort({ rating: -1, ratingsCount: -1 })
      .limit(10)
      .project(COMPANY_REMOVE_FIELDS)
      .exec();
  }

  getHighestRatedCompanies(): Promise<Company[]> {
    return this.companyModel
      .aggregate()
      .addFields(COMPANY_ADD_RATING_FIELD)
      .sort({ rating: -1, ratingsCount: -1 })
      .limit(10)
      .project(COMPANY_REMOVE_FIELDS)
      .exec();
  }

  async uploadImage(company: Company, image: Express.Multer.File): Promise<Company> {
    if (company.imagePath) {
      await unlink(company.imagePath);
    }

    return this.companyModel
      .findByIdAndUpdate(
        company._id,
        { imagePath: `${image.destination}/${image.filename}` },
        { new: true },
      )
      .orFail()
      .exec();
  }

  update(id: string, dto: CompanyUpdateDto): Promise<Company> {
    return this.companyModel.findByIdAndUpdate(id, dto, { new: true }).orFail().exec();
  }

  delete(id: string) {
    return transactionHandler(this.connection, async (session) => {
      const company = await this.companyModel
        .findByIdAndDelete(id)
        .orFail()
        .session(session)
        .exec();

      if (company.imagePath) {
        await unlink(company.imagePath);
      }

      return company;
    });
  }

  async getRating(id: string): Promise<Rating> {
    const company = await this.companyModel.findById(id).orFail().lean().exec();
    const rating =
      company.ratingsCount === 0 ? 0 : company.ratingsSum / company.ratingsCount;

    return {
      rating,
      ratingsCount: company.ratingsCount,
    };
  }
}

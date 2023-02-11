import {
  CompanyCreateDto,
  CompanySearchQueryDto,
  CompanyUpdateDto,
} from '@nbp-it-job-board/models';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>
  ) {}

  async create(dto: CompanyCreateDto): Promise<Company> {
    return await this.companyModel.create(dto).catch((e) => {
      throw e;
    });
  }

  async findById(id: string): Promise<Company> {
    return await this.companyModel.findById(id).exec();
  }

  async search(queryDto: CompanySearchQueryDto): Promise<Company[]> {
    throw new NotImplementedException();

    // let query: Record<string, any> = {};

    // if (queryDto.name) {
    //   query.name = { $regex: queryDto.name + '.*' };
    // }
    // if (queryDto.rating) {
    // }
    // if (queryDto.location) {
    //   query['location.country'] = queryDto.location.country;

    //   if (queryDto.location.city) {
    //     query['location.city'] = queryDto.location.city;
    //   }
    // }

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
    return await this.companyModel.findByIdAndRemove(id).exec();
  }
}

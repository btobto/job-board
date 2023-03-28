import {
  PostingCreateDto,
  PostingSearchQueryDto,
  PostingUpdateDto,
} from './dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ClientSession, Model } from 'mongoose';
import { Posting, PostingDocument } from './schemas';
import { User } from 'src/users/schemas';

@Injectable()
export class PostingsService {
  constructor(
    @InjectModel(Posting.name)
    private postingModel: Model<PostingDocument>,
  ) {}

  search(queryDto: PostingSearchQueryDto): Promise<Posting[]> {
    const query: Record<string, any> = {};

    if (queryDto.location) {
      query['location.country'] = queryDto.location.country;

      if (queryDto.location.city) {
        query['location.city'] = queryDto.location.city;
      }
    }
    if (queryDto.position) {
      query['position'] = { $regex: queryDto.position, $options: 'i' };
    }
    if (queryDto.datePosted) {
      query['datePosted'] = { $gte: queryDto.datePosted };
    }
    if (queryDto.remote != null) {
      query['remote'] = queryDto.remote;
    }
    if (queryDto.requirements) {
      query['requirements'] = { $all: queryDto.requirements };
    }

    console.log(query);

    return this.postingModel
      .find(query)
      .populate('company', 'name website ratingsSum ratingsCount')
      .limit(10)
      .exec();
  }

  create(companyId: string, dto: PostingCreateDto): Promise<Posting> {
    return this.postingModel.create({ ...dto, company: companyId });
  }

  async toggleApply(postingId: string, userId: string): Promise<Posting> {
    const posting = await this.postingModel.findById(postingId);
    const user = userId as unknown as User;

    const index = posting.applicants.indexOf(user);
    if (index !== -1) {
      posting.applicants.splice(index, 1);
    } else {
      posting.applicants.push(user);
    }

    return posting.save();
  }

  findById(id: string, userId: string): Promise<Posting> {
    return this.postingModel
      .findById(id)
      .orFail()
      .populate({
        path: 'applicants',
        select: 'name email',
      })
      .lean({
        transform: (doc) => {
          if (doc.company && doc.company != userId) {
            delete doc.applicants;
          }
          return doc;
        },
      })
      .exec();
  }

  findAllCompanyPostings(companyId: string): Promise<Posting[]> {
    return this.postingModel.where('company').equals(companyId).exec();
  }

  update(
    id: string,
    companyId: string,
    dto: PostingUpdateDto,
  ): Promise<Posting> {
    return this.postingModel
      .findOneAndUpdate(
        { _id: id, company: companyId },
        { ...dto, dateUpdated: Date.now() },
        { new: true },
      )
      .orFail()
      .exec();
  }

  delete(id: string, companyId: string) {
    return this.postingModel
      .findOneAndDelete({ _id: id, company: companyId })
      .orFail()
      .exec();
  }

  deleteAllCompanyPostings(companyId: string, session: ClientSession = null) {
    return this.postingModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .session(session)
      .exec();
  }
}

import {
  PostingCreateDto,
  PostingSearchQueryDto,
  PostingUpdateDto,
} from '@nbp-it-job-board/models/posting';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Posting, PostingDocument } from './schemas/posting.schema';

@Injectable()
export class PostingsService {
  constructor(
    @InjectModel(Posting.name) private postingModel: Model<PostingDocument>
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

  apply(postingId: string, userId: string): Promise<Posting> {
    // const posting = await this.postingModel.findById(postingId);

    // let operator = posting.applicants.includes(userId as unknown as User)
    //   ? '$pull'
    //   : '$addToSet';

    // return posting
    //   .updateOne(
    //     { [operator]: { applicants: userId } },
    //     { returnDocument: 'after' }
    //   )
    //   .exec();

    return this.postingModel
      .findByIdAndUpdate(
        postingId,
        { $addToSet: { applicants: userId } },
        { new: true }
      )
      .orFail()
      .exec();
  }

  unapply(postingId: string, userId: string): Promise<Posting> {
    return this.postingModel
      .findByIdAndUpdate(
        postingId,
        { $pull: { applicants: userId } },
        { new: true }
      )
      .orFail()
      .exec();
  }

  findById(id: string): Promise<Posting> {
    return this.postingModel
      .findById(id)
      .orFail()
      .populate('applicants', 'name email')
      .exec();
  }

  findAllCompanyPostings(companyId: string): Promise<Posting[]> {
    return this.postingModel.where('company').equals(companyId).exec();
  }

  update(id: string, dto: PostingUpdateDto): Promise<Posting> {
    return this.postingModel
      .findByIdAndUpdate(id, { ...dto, dateUpdated: Date.now() }, { new: true })
      .orFail()
      .exec();
  }

  delete(id: string) {
    return this.postingModel.findByIdAndDelete(id).orFail().exec();
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

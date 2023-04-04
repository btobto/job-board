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
    @InjectModel(Posting.name) private postingModel: Model<PostingDocument>,
  ) {}

  search(queryDto: PostingSearchQueryDto): Promise<Posting[]> {
    const query = this.postingModel.find();

    if (queryDto.location) {
      query.where('location.country').equals(queryDto.location.country);

      if (queryDto.location.city) {
        query.where('location.city').equals(queryDto.location.city);
      }
    }
    if (queryDto.position) {
      query.where({ position: { $regex: queryDto.position, $options: 'i' } });
    }
    if (queryDto.datePosted) {
      query.gte('datePosted', queryDto.datePosted);
    }
    if (queryDto.remoteAvailable != null) {
      query.where('remoteAvailable').equals(queryDto.remoteAvailable);
    }
    if (queryDto.requirements) {
      query.where({ requirements: { $all: queryDto.requirements } });
    }

    console.log(query);

    return query
      .populate('company', 'name website ratingsSum ratingsCount')
      .limit(10)
      .exec();
  }

  create(companyId: string, dto: PostingCreateDto): Promise<Posting> {
    return this.postingModel.create({ ...dto, company: companyId });
  }

  async toggleApply(postingId: string, userId: string): Promise<Posting> {
    const posting = await this.postingModel.findById(postingId).orFail().exec();
    const user = userId as unknown as User;

    const index = posting.applicants.indexOf(user);
    if (index !== -1) {
      posting.applicants.splice(index, 1);
    } else {
      posting.applicants.push(user);
    }

    return posting.save();
  }

  async findById(id: string, userId: string): Promise<Posting> {
    const posting = await this.postingModel.findById(id).orFail().exec();

    if ((posting.company as mongoose.Types.ObjectId).toHexString() === userId) {
      await posting.populate({
        path: 'applicants',
        select: 'name email',
      });

      return posting.toObject({ transform: (doc, ret, opts) => ret });
    }

    return posting.toObject();
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

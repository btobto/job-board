import {
  PostingCreateDto,
  PostingSearchQueryDto,
  PostingUpdateDto,
} from './dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ClientSession, Model } from 'mongoose';
import { Posting, PostingDocument } from './schemas';
import { Person } from 'src/persons/schemas';
import { PersonsService } from 'src/persons/persons.service';

@Injectable()
export class PostingsService {
  constructor(
    @InjectModel(Posting.name) private postingModel: Model<PostingDocument>,
    private personsService: PersonsService,
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
    if (queryDto.remoteAvailable === true) {
      query.where('remoteAvailable').equals(true);
    }
    if (queryDto.requirements) {
      query.where({ requirements: { $all: queryDto.requirements } });
    }

    console.log(query);

    return query
      .populate('company', '_id name imagePath ratingsSum ratingsCount')
      .limit(10)
      .exec();
  }

  getRecommended(person: Person): Promise<Posting[]> {
    const fields: Record<string, any> = {
      skillsMatch: {
        $size: {
          $setIntersection: ['$requirements', person.skills],
        },
      },
      remoteMatch: {
        $cond: [{ $eq: ['$remoteAvailable', true] }, 1, 0],
      },
      positionMatch: {
        $cond: [
          {
            $in: [
              '$position',
              person.prevExperience.map((job) => new RegExp(job.position, 'i')),
            ],
          },
          3,
          0,
        ],
      },
    };

    if (person.location && person.location?.country) {
      fields.locationMatch = {
        $cond: [
          {
            $and: [
              { $eq: ['$location.country', person.location.country] },
              person.location.country && {
                $eq: ['$location.city', person.location.city],
              },
            ],
          },
          1,
          0,
        ],
      };
    }

    return this.postingModel
      .aggregate()
      .match({
        requirements: { $exists: true, $not: { $size: 0 } },
      })
      .addFields(fields)
      .addFields({
        totalWeight: {
          $add: [
            '$skillsMatch',
            '$locationMatch',
            '$remoteMatch',
            '$positionMatch',
          ],
        },
      })
      .match({
        totalWeight: { $gt: 0 },
      })
      .sort({
        totalWeight: -1,
      })
      .limit(5)
      .lookup({
        from: 'companies',
        localField: 'company',
        foreignField: '_id',
        pipeline: [
          {
            $addFields: {
              rating: {
                $cond: [
                  { $eq: ['$ratingsCount', 0] },
                  0,
                  { $divide: ['$ratingsSum', '$ratingsCount'] },
                ],
              },
            },
          },
          { $project: { hashedPassword: 0, ratingsSum: 0 } },
        ],
        as: 'company',
      })
      .unwind('$company')
      .exec();
  }

  create(companyId: string, dto: PostingCreateDto): Promise<Posting> {
    return this.postingModel.create({ ...dto, company: companyId });
  }

  async toggleApply(postingId: string, personId: string): Promise<Posting> {
    const posting = await this.postingModel.findById(postingId).orFail().exec();
    const person = personId as unknown as Person;

    const index = posting.applicants.indexOf(person);
    if (index !== -1) {
      posting.applicants.splice(index, 1);
    } else {
      posting.applicants.push(person);
    }

    return posting.save();
  }

  async findById(id: string, userId: string): Promise<Posting> {
    return this.postingModel.findById(id).orFail().exec();
  }

  findAllCompanyPostings(companyId: string): Promise<Posting[]> {
    return this.postingModel.where('company').equals(companyId).exec();
  }

  async getApplicants(postingId: string, companyId: string) {
    const posting = await this.postingModel
      .findOne({
        _id: postingId,
        company: companyId,
      })
      .orFail()
      .exec();

    return this.personsService.findMany(
      posting.applicants as unknown as string[],
    );
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

import { PostingCreateDto, PostingSearchQueryDto, PostingUpdateDto } from './dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ClientSession, Model } from 'mongoose';
import { Posting, PostingDocument } from './schemas';
import { Person } from 'src/persons/schemas';
import { PersonsService } from 'src/persons/persons.service';
import { COMPANY_REMOVE_FIELDS, COMPANY_ADD_RATING_FIELD } from 'src/common/constants';
import { inspect } from 'util';

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
        $multiply: [2, { $size: { $setIntersection: ['$requirements', person.skills] } }],
      },
      countryMatch: person.location?.country
        ? { $cond: [{ $eq: ['$location.country', person.location.country] }, 1, 0] }
        : 0,
      cityMatch:
        person.location?.country && person.location?.city
          ? {
              $cond: [
                {
                  $and: [
                    { $ne: ['$countryMatch', 0] },
                    { $eq: ['$location.city', person.location.city] },
                  ],
                },
                2,
                0,
              ],
            }
          : 0,
      remoteMatch: {
        $cond: [
          { $eq: ['$remoteAvailable', true] },
          { $cond: [{ $ne: ['$cityMatch', 0] }, 1, 2] },
          0,
        ],
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

    // console.log(inspect(fields, { showHidden: false, depth: null, colors: true }));

    return this.postingModel
      .aggregate()
      .addFields(fields)
      .addFields({
        totalWeight: {
          $add: [
            '$skillsMatch',
            '$countryMatch',
            '$cityMatch',
            '$remoteMatch',
            '$positionMatch',
          ],
        },
      })
      .sort({
        totalWeight: -1,
        _id: 1,
      })
      .limit(5)
      .lookup({
        from: 'companies',
        localField: 'company',
        foreignField: '_id',
        pipeline: [
          { $addFields: COMPANY_ADD_RATING_FIELD },
          { $project: COMPANY_REMOVE_FIELDS },
        ],
        as: 'company',
      })
      .unwind('$company')
      .sort({ totalWeight: -1, 'company.rating': -1 })
      .exec();
    // .then((postings) => {
    //   console.log(postings.map((p) => p.totalWeight));
    //   return postings;
    // });
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

    return this.personsService.findMany(posting.applicants as unknown as string[]);
  }

  update(id: string, companyId: string, dto: PostingUpdateDto): Promise<Posting> {
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

import {
  ReviewCreateDto,
  ReviewUpdateDto,
} from '@nbp-it-job-board/models/review';
import { Injectable, Scope } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model } from 'mongoose';
import { PaginationOptionsDto } from '../utils/dtos/pagination-options.dto';
import { PaginationResultDto } from '../utils/dtos/pagination-result.dto';
import { mongooseTransactionHandler } from '../utils/mongoose-helpers/mongoose-transaction.handler';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectConnection() private readonly connection: Connection
  ) {}

  create(companyId: string, dto: ReviewCreateDto): Promise<Review> {
    return mongooseTransactionHandler(
      this.connection,
      async (session: ClientSession) => {
        return this.reviewModel.create(
          [
            {
              ...dto,
              company: companyId,
              user: dto.userId,
            },
          ],
          { session }
        );
      }
    ).then((r) => r[0]);
  }

  findById(id: string): Promise<Review> {
    return this.reviewModel.findById(id).orFail().exec();
  }

  async findCompanyReviews(
    companyId: string,
    searchQuery: PaginationOptionsDto
  ): Promise<PaginationResultDto<Review[]>> {
    console.log(searchQuery);
    console.log(searchQuery.skip);

    const query = this.reviewModel.where('company').equals(companyId);

    const total = await query.clone().countDocuments().exec();

    const reviews = await query
      .clone()
      .sort({ datePosted: -1 })
      .skip(searchQuery.skip)
      .limit(searchQuery.take)
      .exec();

    return {
      data: reviews.map((r) => r.toObject()),
      page: searchQuery.page,
      take: searchQuery.take,
      totalCount: total,
    };
  }

  update(dto: ReviewUpdateDto): Promise<Review> {
    return mongooseTransactionHandler(this.connection, async (session) => {
      const now = new Date();

      return this.reviewModel
        .findOneAndUpdate(
          { company: dto.companyId, user: dto.userId },
          { ...dto, dateUpdated: now },
          {
            new: false,
            $locals: {
              newRating: dto.rating,
            },
          }
        )
        .orFail()
        .lean()
        .session(session)
        .exec()
        .then((doc) => {
          return {
            ...doc,
            rating: dto.rating,
            description: dto.description,
            dateUpdated: now,
          };
        });
    });
  }

  delete(id: string) {
    return mongooseTransactionHandler(this.connection, async (session) => {
      return this.reviewModel
        .findByIdAndDelete(id)
        .orFail()
        .session(session)
        .exec();
    });
  }

  deleteAllCompanyReviews(companyId: string, session: ClientSession = null) {
    return this.reviewModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .session(session)
      .exec();
  }
}

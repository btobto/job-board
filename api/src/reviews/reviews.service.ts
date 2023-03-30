import { ReviewCreateDto, ReviewUpdateDto } from './dto';
import { Injectable, Scope } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model } from 'mongoose';
import { PaginationOptionsDto, PaginationResultDto } from '../common/dto';
import { transactionHandler } from '../common/mongoose-helpers';
import { Review, ReviewDocument } from './schemas';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(
    companyId: string,
    userId: string,
    dto: ReviewCreateDto,
  ): Promise<Review> {
    return transactionHandler(
      this.connection,
      async (session: ClientSession) => {
        return this.reviewModel.create(
          [
            {
              ...dto,
              company: companyId,
              user: userId,
            },
          ],
          { session },
        );
      },
    ).then((r) => r[0]);
  }

  findUserReviewForCompany(companyId: string, userId: string) {
    return this.reviewModel
      .findOne({
        company: companyId,
        user: userId,
      })
      .lean()
      .exec();
  }

  findById(id: string): Promise<Review> {
    return this.reviewModel.findById(id).orFail().exec();
  }

  async findCompanyReviews(
    companyId: string,
    { page, take, skip }: PaginationOptionsDto,
  ): Promise<PaginationResultDto<Review[]>> {
    const query = this.reviewModel.where('company').equals(companyId);

    const total = await query.clone().countDocuments().exec();

    const reviews = await query
      .clone()
      .sort({ datePosted: -1 })
      .skip(skip)
      .limit(take)
      .exec();

    return {
      data: reviews.map((r) => r.toObject()),
      page: page,
      take: take,
      totalCount: total,
      pageCount: Math.ceil(total / take),
    };
  }

  update(
    reviewId: string,
    userId: string,
    dto: ReviewUpdateDto,
  ): Promise<Review> {
    return transactionHandler(this.connection, async (session) => {
      const now = new Date();

      return this.reviewModel
        .findOneAndUpdate(
          { _id: reviewId, user: userId },
          { ...dto, dateUpdated: now },
          {
            new: false,
            $locals: {
              newRating: dto.rating,
            },
          },
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

  delete(reviewId: string, userId: string) {
    return transactionHandler(this.connection, async (session) => {
      return this.reviewModel
        .findOneAndDelete({ _id: reviewId, user: userId })
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

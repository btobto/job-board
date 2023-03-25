import { ReviewCreateDto, ReviewUpdateDto } from './dto';
import { Injectable, Scope } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model } from 'mongoose';
import { PaginationOptionsDto, PaginationResultDto } from '../common/dto';
import { mongooseTransactionHandler } from '../common/mongoose-helpers';
import { Review, ReviewDocument } from './schemas';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectConnection() private readonly connection: Connection,
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
          { session },
        );
      },
    ).then((r) => r[0]);
  }

  findById(id: string): Promise<Review> {
    return this.reviewModel.findById(id).orFail().exec();
  }

  async findCompanyReviews(
    companyId: string,
    searchQuery: PaginationOptionsDto,
  ): Promise<PaginationResultDto<Review[]>> {
    const { page, take, skip } = searchQuery;
    // console.log(page, take, skip);

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

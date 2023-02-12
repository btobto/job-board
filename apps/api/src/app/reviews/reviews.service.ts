import { ReviewCreateDto, ReviewUpdateDto } from '@nbp-it-job-board/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>
  ) {}

  async create(companyId: string, dto: ReviewCreateDto): Promise<Review> {
    return await this.reviewModel
      .create({ ...dto, company: companyId })
      .catch((e) => {
        throw e;
      });
  }

  async findById(id: string): Promise<Review> {
    return await this.reviewModel.findById(id).exec();
  }

  async findAllCompanyReviews(companyId: string): Promise<Review[]> {
    return await this.reviewModel
      .find()
      .where('company')
      .equals(companyId)
      .exec();
  }

  async update(dto: ReviewUpdateDto): Promise<Review> {
    return await this.reviewModel.findOneAndUpdate(
      { company: dto.companyId, user: dto.userId },
      { ...dto, datePosted: Date.now },
      { new: true }
    );
  }

  async delete(id: string) {
    return await this.reviewModel.findByIdAndDelete(id).exec();
  }

  async deleteAll(companyId: string) {
    return await this.reviewModel
      .deleteMany()
      .where('company')
      .equals(companyId)
      .exec();
  }
}

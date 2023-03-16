import {
  ReviewCreateDto,
  ReviewUpdateDto,
} from '@nbp-it-job-board/models/review';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { MongoExceptionFilter } from '../utils/filters/mongo-exception.filter';
import { ParseObjectIdPipe } from '../utils/pipes/parse-objectId.pipe';
import { ReviewsService } from './reviews.service';
import { Review } from './schemas/review.schema';

@Controller('reviews')
@UseFilters(MongoExceptionFilter)
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get(':companyId')
  async getCompanyReviews(
    @Param('companyId', ParseObjectIdPipe) companyId: string
  ): Promise<Review[]> {
    return await this.reviewsService.findAllCompanyReviews(companyId);
  }

  @Post(':companyId')
  async post(
    @Param('companyId', ParseObjectIdPipe) companyId,
    @Body() dto: ReviewCreateDto
  ): Promise<Review> {
    return await this.reviewsService.create(companyId, dto);
  }

  @Patch()
  async update(@Body() dto: ReviewUpdateDto): Promise<Review> {
    return await this.reviewsService.update(dto);
  }

  @HttpCode(204)
  @Delete(':reviewId')
  async delete(@Param('reviewId', ParseObjectIdPipe) reviewId) {
    await this.reviewsService.delete(reviewId);
  }
}

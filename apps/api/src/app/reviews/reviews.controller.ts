import { ReviewCreateDto, ReviewUpdateDto } from '@nbp-it-job-board/models';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../utils/pipes/parse-objectId.pipe';
import { ReviewsService } from './reviews.service';
import { Review } from './schemas/review.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get(':companyId')
  async getCompanyReviews(
    @Param('companyId', ParseObjectIdPipe) companyId: string
  ): Promise<Review[]> {
    return await this.reviewsService.findAllCompanyReviews(companyId);
  }

  @Post(':companyId/')
  async post(
    @Param('companyId', ParseObjectIdPipe) companyId,
    @Body() dto: ReviewCreateDto
  ): Promise<Review> {
    try {
      return await this.reviewsService.create(companyId, dto);
    } catch (error) {
      throw new BadRequestException(
        'User has already posted a review for that company.'
      );
    }
  }

  @Patch()
  async update(@Body() dto: ReviewUpdateDto): Promise<Review> {
    return await this.reviewsService.update(dto);
  }

  @Delete(':reviewId')
  async delete(@Param('reviewId', ParseObjectIdPipe) reviewId) {
    await this.reviewsService.delete(reviewId);
  }
}

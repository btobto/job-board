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
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { PaginationOptionsDto } from '../utils/dtos/pagination-options.dto';
import { PaginationResultDto } from '../utils/dtos/pagination-result.dto';
import { ParseObjectIdPipe } from '../utils/pipes/parse-objectId.pipe';
import { ReviewsService } from './reviews.service';
import { Review } from './schemas/review.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get(':companyId')
  async getCompanyReviews(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
    @Query() searchQuery: PaginationOptionsDto
  ): Promise<PaginationResultDto<Review[]>> {
    return await this.reviewsService.findCompanyReviews(companyId, searchQuery);
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':reviewId')
  async delete(@Param('reviewId', ParseObjectIdPipe) reviewId) {
    await this.reviewsService.delete(reviewId);
  }
}

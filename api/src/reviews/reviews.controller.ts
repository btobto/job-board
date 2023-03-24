import { ReviewCreateDto, ReviewUpdateDto } from './dto';
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
import { PaginationOptionsDto, PaginationResultDto } from '../common/dto';
import { ParseObjectIdPipe } from '../common/pipes';
import { ReviewsService } from './reviews.service';
import { Review } from './schemas';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get(':companyId')
  async getCompanyReviews(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
    @Query() searchQuery: PaginationOptionsDto,
  ): Promise<PaginationResultDto<Review[]>> {
    return await this.reviewsService.findCompanyReviews(companyId, searchQuery);
  }

  @Post(':companyId')
  async post(
    @Param('companyId', ParseObjectIdPipe) companyId,
    @Body() dto: ReviewCreateDto,
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

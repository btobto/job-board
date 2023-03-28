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
import { ActiveUser } from 'src/auth/decorators';
import { User } from 'src/users/schemas';

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
    @Param('companyId', ParseObjectIdPipe) companyId: string,
    @ActiveUser('_id') userId: string,
    @Body() dto: ReviewCreateDto,
  ): Promise<Review> {
    return await this.reviewsService.create(companyId, userId, dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) reviewId,
    @ActiveUser('_id') userId: string,
    @Body() dto: ReviewUpdateDto,
  ): Promise<Review> {
    return await this.reviewsService.update(reviewId, userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseObjectIdPipe) reviewId,
    @ActiveUser('_id') userId: string,
  ) {
    await this.reviewsService.delete(reviewId, userId);
  }
}

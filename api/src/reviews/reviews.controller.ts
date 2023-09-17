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
  UseGuards,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { PaginationOptionsDto, PaginationResult } from '../common/dto';
import { ParseObjectIdPipe } from '../common/pipes';
import { ReviewsService } from './reviews.service';
import { Review } from './schemas';
import { ActiveUser } from 'src/auth/decorators';
import { Person } from 'src/persons/schemas';
import { RoleGuard } from 'src/auth/guards';
import { UserType } from 'src/common/enums';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get(':companyId/person')
  async getPersonReviewForCompany(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
    @ActiveUser('_id') personId: string,
  ) {
    return await this.reviewsService.findPersonReviewForCompany(
      companyId,
      personId,
    );
  }

  @Get(':companyId')
  async getCompanyReviews(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
    @Query() searchQuery: PaginationOptionsDto,
  ): Promise<PaginationResult<Review>> {
    return await this.reviewsService.findCompanyReviews(companyId, searchQuery);
  }

  @UseGuards(RoleGuard(UserType.Person))
  @Post(':companyId')
  async post(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
    @ActiveUser('_id') personId: string,
    @Body() dto: ReviewCreateDto,
  ): Promise<Review> {
    return await this.reviewsService.create(companyId, personId, dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) reviewId,
    @ActiveUser('_id') personId: string,
    @Body() dto: ReviewUpdateDto,
  ): Promise<Review> {
    return await this.reviewsService.update(reviewId, personId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseObjectIdPipe) reviewId,
    @ActiveUser('_id') personId: string,
  ) {
    await this.reviewsService.delete(reviewId, personId);
  }
}

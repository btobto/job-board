import {
  PostingCreateDto,
  PostingSearchQueryDto,
  PostingUpdateDto,
} from '@nbp-it-job-board/models/posting';
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
import { PostingsService } from './postings.service';
import { Posting } from './schemas/posting.schema';

@Controller('postings')
export class PostingsController {
  constructor(private postingsService: PostingsService) {}

  @Post('search')
  async searchPostings(
    @Body() queryDto: PostingSearchQueryDto
  ): Promise<Posting[]> {
    console.log(queryDto);
    return await this.postingsService.search(queryDto);
  }

  @Get('company/:companyId')
  async getCompanyPostings(
    @Param('companyId', ParseObjectIdPipe) companyId: string
  ): Promise<Posting[]> {
    return await this.postingsService.findAllCompanyPostings(companyId);
  }

  @Get(':id')
  async getPosting(
    @Param('id', ParseObjectIdPipe) id: string
  ): Promise<Posting> {
    return await this.postingsService.findById(id);
  }

  @Post(':companyId')
  async post(
    @Param('companyId', ParseObjectIdPipe) companyId,
    @Body() dto: PostingCreateDto
  ): Promise<Posting> {
    return await this.postingsService.create(companyId, dto);
  }

  @Patch(':postingId/apply/:userId')
  async apply(
    @Param('postingId', ParseObjectIdPipe) postingId,
    @Param('userId', ParseObjectIdPipe) userId
  ) {
    return await this.postingsService.apply(postingId, userId);
  }

  @Patch(':postingId/unapply/:userId')
  async unapply(
    @Param('postingId', ParseObjectIdPipe) postingId,
    @Param('userId', ParseObjectIdPipe) userId
  ) {
    return await this.postingsService.unapply(postingId, userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: PostingUpdateDto
  ): Promise<Posting> {
    const updatedPosting = await this.postingsService.update(id, dto);

    if (!updatedPosting) throw new BadRequestException("Posting doesn't exist");

    return updatedPosting;
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.postingsService.delete(id);
  }
}

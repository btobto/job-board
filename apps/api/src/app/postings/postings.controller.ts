import { PostingCreateDto, PostingUpdateDto } from '@nbp-it-job-board/models';
import {
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

  @Get(':companyId')
  async getCompanyPostings(
    @Param('companyId', ParseObjectIdPipe) companyId: string
  ): Promise<Posting[]> {
    return await this.postingsService.findAllCompanyPostings(companyId);
  }

  @Post(':companyId/')
  async post(
    @Param('companyId', ParseObjectIdPipe) companyId,
    @Body() dto: PostingCreateDto
  ): Promise<Posting> {
    return await this.postingsService.create(companyId, dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: PostingUpdateDto
  ): Promise<Posting> {
    return await this.postingsService.update(id, dto);
  }

  @Delete(':reviewId')
  async delete(@Param('reviewId', ParseObjectIdPipe) reviewId) {
    await this.postingsService.delete(reviewId);
  }
}

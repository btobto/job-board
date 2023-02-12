import {
  PostingCreateDto,
  PostingSearchQueryDto,
  PostingUpdateDto,
} from '@nbp-it-job-board/models';
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

  @Get('search')
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

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: PostingUpdateDto
  ): Promise<Posting> {
    return await this.postingsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.postingsService.delete(id);
  }
}

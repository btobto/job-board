import {
  PostingCreateDto,
  PostingSearchQueryDto,
  PostingUpdateDto,
} from './dto';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes';
import { PostingsService } from './postings.service';
import { Posting } from './schemas';

@Controller('postings')
export class PostingsController {
  constructor(private postingsService: PostingsService) {}

  @Post('search')
  async searchPostings(
    @Body() queryDto: PostingSearchQueryDto,
  ): Promise<Posting[]> {
    console.log(queryDto);
    return await this.postingsService.search(queryDto);
  }

  @Get('company/:companyId')
  async getCompanyPostings(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
  ): Promise<Posting[]> {
    return await this.postingsService.findAllCompanyPostings(companyId);
  }

  @Get(':id')
  async getPosting(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Posting> {
    return await this.postingsService.findById(id);
  }

  @Post(':companyId')
  async post(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
    @Body() dto: PostingCreateDto,
  ): Promise<Posting> {
    return await this.postingsService.create(companyId, dto);
  }

  @Patch('apply/:postingId')
  async apply(
    @Param('postingId', ParseObjectIdPipe) postingId: string,
    @Body('userId', ParseObjectIdPipe) userId: string,
  ) {
    console.log(userId);
    return await this.postingsService.apply(postingId, userId);
  }

  @Patch('unapply/:postingId/')
  async unapply(
    @Param('postingId', ParseObjectIdPipe) postingId: string,
    @Body('userId', ParseObjectIdPipe) userId,
  ) {
    return await this.postingsService.unapply(postingId, userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: PostingUpdateDto,
  ): Promise<Posting> {
    return await this.postingsService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.postingsService.delete(id);
  }
}

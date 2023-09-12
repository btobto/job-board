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
  UseInterceptors,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes';
import { PostingsService } from './postings.service';
import { Posting } from './schemas';
import { ActiveUser } from 'src/auth/decorators';
import { PostingInterceptor } from 'src/common/interceptors';

@UseInterceptors(PostingInterceptor)
@Controller('postings')
export class PostingsController {
  constructor(private postingsService: PostingsService) {}

  @Post('search')
  async searchPostings(
    @Body() queryDto: PostingSearchQueryDto,
  ): Promise<Posting[]> {
    // console.log(queryDto);
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
    @ActiveUser('_id') userId: string,
  ): Promise<Posting> {
    return await this.postingsService.findById(id, userId);
  }

  @Post()
  async post(
    @Body() dto: PostingCreateDto,
    @ActiveUser('_id') companyId: string,
  ): Promise<Posting> {
    return await this.postingsService.create(companyId, dto);
  }

  @Patch(':postingId/application')
  async apply(
    @Param('postingId', ParseObjectIdPipe) postingId: string,
    @ActiveUser('_id') personId: string,
  ) {
    return await this.postingsService.toggleApply(postingId, personId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: PostingUpdateDto,
    @ActiveUser('_id') companyId: string,
  ): Promise<Posting> {
    return await this.postingsService.update(id, companyId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseObjectIdPipe) id: string,
    @ActiveUser('_id') companyId: string,
  ) {
    await this.postingsService.delete(id, companyId);
  }
}

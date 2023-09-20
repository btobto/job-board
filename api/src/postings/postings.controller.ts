import { PostingCreateDto, PostingSearchQueryDto, PostingUpdateDto } from './dto';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes';
import { PostingsService } from './postings.service';
import { Posting } from './schemas';
import { ActiveUser } from 'src/auth/decorators';
import {
  POSTING_INTERCEPTOR_KEY as POSTINGS_INTERCEPTOR_KEY,
  PostingsInterceptor,
} from './interceptors/postings.interceptor';
import mongoose, { mongo } from 'mongoose';
import { RoleGuard } from 'src/auth/guards';
import { UserType } from 'src/common/enums';
import { SkipInterceptor } from 'src/common/decorators';
import { PersonsService } from 'src/persons/persons.service';
import { Person } from 'src/persons/schemas';

@UseInterceptors(PostingsInterceptor)
@Controller('postings')
export class PostingsController {
  constructor(private postingsService: PostingsService) {}

  @Post('search')
  async searchPostings(@Body() queryDto: PostingSearchQueryDto): Promise<Posting[]> {
    return await this.postingsService.search(queryDto);
  }

  @SkipInterceptor(POSTINGS_INTERCEPTOR_KEY)
  @UseGuards(RoleGuard(UserType.Person))
  @Get('recommended')
  async getRecommendedPostings(@ActiveUser() person: Person) {
    return await this.postingsService.getRecommended(person);
  }

  @Get('company/:companyId')
  async getCompanyPostings(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
  ): Promise<Posting[]> {
    return await this.postingsService.findAllCompanyPostings(companyId);
  }

  @SkipInterceptor(POSTINGS_INTERCEPTOR_KEY)
  @UseGuards(RoleGuard(UserType.Company))
  @Get(':postingId/applicants')
  async getPostingApplicants(
    @Param('postingId', ParseObjectIdPipe) postingId: string,
    @ActiveUser('_id') companyId: string,
  ): Promise<Person[]> {
    return await this.postingsService.getApplicants(postingId, companyId);
  }

  @Get(':id')
  async getPosting(
    @Param('id', ParseObjectIdPipe) id: string,
    @ActiveUser('_id') userId: string,
  ): Promise<Posting> {
    return await this.postingsService.findById(id, userId);
  }

  @UseGuards(RoleGuard(UserType.Company))
  @Post()
  async post(
    @Body() dto: PostingCreateDto,
    @ActiveUser('_id') companyId: string,
  ): Promise<Posting> {
    return await this.postingsService.create(companyId, dto);
  }

  @UseGuards(RoleGuard(UserType.Person))
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

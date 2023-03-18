import {
  CompanyCreateDto,
  CompanySearchQueryDto,
  CompanyUpdateDto,
} from '@nbp-it-job-board/models/company';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../utils/pipes/parse-objectId.pipe';
import { CompaniesService } from './companies.service';
import { Company } from './schemas/company.schema';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post('register')
  async register(@Body() dto: CompanyCreateDto): Promise<Company> {
    return await this.companiesService.create(dto);
  }

  @Post('login')
  async login(@Body('email') email: string): Promise<Company> {
    return await this.companiesService.findByEmail(email);
  }

  @Post('search')
  async search(@Body() queryDto: CompanySearchQueryDto): Promise<any[]> {
    console.log(queryDto);
    return await this.companiesService.search(queryDto);
  }

  @Get(':id')
  async get(@Param('id', ParseObjectIdPipe) id: string): Promise<Company> {
    return await this.companiesService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CompanyUpdateDto
  ) {
    return await this.companiesService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.companiesService.delete(id);
  }
}

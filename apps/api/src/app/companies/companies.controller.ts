import {
  CompanyCreateDto,
  CompanySearchQueryDto,
  CompanyUpdateDto,
} from '@nbp-it-job-board/models';
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
    try {
      return await this.companiesService.create(dto);
    } catch (error) {
      throw new BadRequestException(
        'Company with that email address already exists.'
      );
    }
  }

  @Post('login')
  async login(@Body('email') email: string): Promise<Company> {
    const company = await this.companiesService.findByEmail(email);

    if (!company) {
      throw new UnauthorizedException('Invalid email address.');
    }

    return company;
  }

  @Get('search')
  async searchCompanies(
    @Body() queryDto: CompanySearchQueryDto
  ): Promise<Company[]> {
    console.log(queryDto);
    return await this.companiesService.search(queryDto);
  }

  @Get(':id')
  async getCompany(
    @Param('id', ParseObjectIdPipe) id: string
  ): Promise<Company> {
    const company = await this.companiesService.findById(id);

    if (!company) {
      throw new NotFoundException('No company with such ID');
    }

    return company;
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
    try {
      await this.companiesService.delete(id);
    } catch (error) {
      throw new NotFoundException("Company doesn't exist.");
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ResourceOwhershipGuard } from 'src/auth/guards';
import { ParseObjectIdPipe } from '../common/pipes';
import { CompaniesService } from './companies.service';
import {
  CompanyCreateDto,
  CompanySearchQueryDto,
  CompanyUpdateDto,
} from './dto';
import { Company } from './schemas';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post('search')
  async search(@Body() queryDto: CompanySearchQueryDto): Promise<Company[]> {
    console.log(queryDto);
    return await this.companiesService.search(queryDto);
  }

  @Get(':id')
  async get(@Param('id', ParseObjectIdPipe) id: string): Promise<Company> {
    return await this.companiesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(ResourceOwhershipGuard)
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CompanyUpdateDto,
  ): Promise<Company> {
    return await this.companiesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ResourceOwhershipGuard)
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.companiesService.delete(id);
  }
}

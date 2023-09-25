import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ResourceOwhershipGuard, RoleGuard } from 'src/auth/guards';
import { ParseObjectIdPipe } from '../common/pipes';
import { CompaniesService } from './companies.service';
import { CompanyCreateDto, CompanySearchQueryDto, CompanyUpdateDto, Rating } from './dto';
import { Company } from './schemas';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserType } from 'src/common/enums';
import { ActiveUser } from 'src/auth/decorators';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post('search')
  @HttpCode(HttpStatus.OK)
  async search(@Body() queryDto: CompanySearchQueryDto): Promise<Company[]> {
    return await this.companiesService.search(queryDto);
  }

  @Get('top')
  async getHighestRated(): Promise<Company[]> {
    return await this.companiesService.getHighestRatedCompanies();
  }

  @Get(':id/rating')
  async getCompanyRating(@Param('id', ParseObjectIdPipe) id: string): Promise<Rating> {
    return await this.companiesService.getRating(id);
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

  @Patch(':id/image')
  @UseGuards(ResourceOwhershipGuard, RoleGuard(UserType.Company))
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @ActiveUser() company: Company,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return await this.companiesService.uploadImage(company, image);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ResourceOwhershipGuard)
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.companiesService.delete(id);
  }
}

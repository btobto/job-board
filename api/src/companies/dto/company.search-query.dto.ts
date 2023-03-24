import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CompanyDto } from './company.dto';

export class CompanySearchQueryDto extends PartialType(
  PickType(CompanyDto, ['name']),
) {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}

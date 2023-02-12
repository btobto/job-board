import { PartialType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Location } from '../../location/location';
import { Company } from '../company';

export class CompanySearchQueryDto extends PartialType(
  PickType(Company, ['name'])
) {
  @IsOptional()
  @Type(() => Location)
  location: Location;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}

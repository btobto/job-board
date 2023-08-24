import { OmitType, PickType } from '@nestjs/mapped-types';
import { CompanyDto } from './company.dto';

export class CompanyCreateDto extends OmitType(CompanyDto, [
  'id',
  'about',
  'ratingsCount',
  'ratingsSum',
] as const) {}

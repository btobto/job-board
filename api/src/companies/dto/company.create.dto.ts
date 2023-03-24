import { PickType } from '@nestjs/mapped-types';
import { CompanyDto } from './company.dto';

export class CompanyCreateDto extends PickType(CompanyDto, [
  'name',
  'email',
] as const) {}

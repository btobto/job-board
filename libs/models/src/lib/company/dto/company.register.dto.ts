import { PickType } from '@nestjs/mapped-types';
import { Company } from '../company';

export class CompanyRegisterDto extends PickType(Company, [
  'name',
  'email',
] as const) {}

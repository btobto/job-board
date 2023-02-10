import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Company } from '../company';

export class CompanyUpdateDto extends PartialType(
  OmitType(Company, ['id', 'email', 'ratingsSum', 'ratingsCount'])
) {}

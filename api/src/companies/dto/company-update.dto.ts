import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CompanyDto } from './company.dto';

export class CompanyUpdateDto extends PartialType(
  OmitType(CompanyDto, [
    'id',
    'email',
    'password',
    'ratingsSum',
    'ratingsCount',
  ]),
) {}

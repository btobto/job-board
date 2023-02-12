import { OmitType } from '@nestjs/mapped-types';
import { Review } from '../review';

export class ReviewCreateDto extends OmitType(Review, [
  'id',
  'companyId',
  'datePosted',
] as const) {}

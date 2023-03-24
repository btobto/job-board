import { OmitType } from '@nestjs/mapped-types';
import { ReviewDto } from './review.dto';

export class ReviewCreateDto extends OmitType(ReviewDto, [
  'id',
  'companyId',
  'datePosted',
] as const) {}

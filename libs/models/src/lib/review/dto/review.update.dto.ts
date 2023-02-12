import { OmitType } from '@nestjs/mapped-types';
import { Review } from '../review';

export class ReviewUpdateDto extends OmitType(Review, [
  'id',
  'datePosted',
] as const) {}

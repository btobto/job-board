import { PickType } from '@nestjs/mapped-types';
import { Review } from '../review';

export class ReviewCreateDto extends PickType(Review, [
  'userId',
  'rating',
  'description',
] as const) {}

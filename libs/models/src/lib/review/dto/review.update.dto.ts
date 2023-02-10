import { PartialType } from '@nestjs/mapped-types';
import { ReviewCreateDto } from './review.create.dto';

export class ReviewUpdateDto extends PartialType(ReviewCreateDto) {}

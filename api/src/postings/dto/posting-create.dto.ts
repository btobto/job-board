import { OmitType } from '@nestjs/mapped-types';
import { PostingDto } from './posting.dto';

export class PostingCreateDto extends OmitType(PostingDto, [
  'id',
  'company',
  'datePosted',
  'applicants',
] as const) {}

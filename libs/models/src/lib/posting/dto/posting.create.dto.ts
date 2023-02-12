import { OmitType } from '@nestjs/mapped-types';
import { Posting } from '../posting';

export class PostingCreateDto extends OmitType(Posting, [
  'id',
  'company',
  'datePosted',
  'applicants',
] as const) {}

import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Posting } from '../posting';

export class PostingSearchQueryDto extends PartialType(
  OmitType(Posting, ['id', 'company', 'applicants'] as const)
) {}

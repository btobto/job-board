import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Posting } from '../posting';

export class PostingUpdateDto extends PartialType(
  OmitType(Posting, ['id', 'company', 'applicants', 'datePosted'] as const)
) {}

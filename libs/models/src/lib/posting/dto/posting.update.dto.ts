import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Posting } from '../posting';

export class PostingUpdateDto extends PartialType(
  OmitType(Posting, ['company', 'applicants', 'datePosted'] as const)
) {}

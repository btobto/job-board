import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Posting } from '../posting';

export class PostingUpdateDto extends PartialType(
  OmitType(Posting, ['companyId', 'applicants', 'datePosted'] as const)
) {}

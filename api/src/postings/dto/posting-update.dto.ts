import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PostingDto } from './posting.dto';

export class PostingUpdateDto extends PartialType(
  OmitType(PostingDto, ['id', 'company', 'applicants', 'datePosted'] as const),
) {}

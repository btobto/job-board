import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PostingDto } from './posting.dto';

export class PostingSearchQueryDto extends PartialType(
  OmitType(PostingDto, ['id', 'company', 'applicants'] as const),
) {}

import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { Posting } from '../posting';

export class PostingSearchQueryDto extends PartialType(
  OmitType(Posting, ['id', 'company', 'applicants'] as const)
) {}

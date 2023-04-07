import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PersonDto } from './person.dto';

export class PersonUpdateDto extends PartialType(
  OmitType(PersonDto, ['_id', 'email', 'password'] as const),
) {}

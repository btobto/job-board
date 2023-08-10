import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PersonDto } from './person.dto';

export class PersonUpdateDto extends PartialType(
  OmitType(PersonDto, ['id', 'email', 'password'] as const),
) {}

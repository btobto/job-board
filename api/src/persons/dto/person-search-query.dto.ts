import { PartialType, PickType } from '@nestjs/mapped-types';
import { PersonDto } from './person.dto';

export class PersonSearchQueryDto extends PartialType(
  PickType(PersonDto, ['name', 'location', 'skills']),
) {}

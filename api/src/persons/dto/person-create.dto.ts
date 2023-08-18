import { PickType } from '@nestjs/mapped-types';
import { PersonDto } from './person.dto';

export class PersonCreateDto extends PickType(PersonDto, [
  'name',
  'email',
  'password',
  'location',
] as const) {}

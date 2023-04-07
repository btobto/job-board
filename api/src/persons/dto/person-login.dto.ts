import { PickType } from '@nestjs/mapped-types';
import { PersonDto } from './person.dto';

export class PersonLoginDto extends PickType(PersonDto, [
  'email',
  'password',
] as const) {}

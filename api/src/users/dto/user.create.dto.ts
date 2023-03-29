import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UserCreateDto extends PickType(UserDto, [
  'name',
  'email',
  'password',
] as const) {}

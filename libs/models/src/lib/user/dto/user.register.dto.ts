import { PickType } from '@nestjs/mapped-types';
import { User } from '../user';

export class UserRegisterDto extends PickType(User, [
  'name',
  'email',
] as const) {}

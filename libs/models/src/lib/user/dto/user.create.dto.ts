import { PickType } from '@nestjs/mapped-types';
import { User } from '../user';

export class UserCreateDto extends PickType(User, ['name', 'email'] as const) {}

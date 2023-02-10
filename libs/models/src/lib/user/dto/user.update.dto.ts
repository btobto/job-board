import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User } from '../user';

export class UserUpdateDto extends PartialType(
  OmitType(User, ['id', 'email'] as const)
) {}

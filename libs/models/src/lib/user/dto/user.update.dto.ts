import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User } from '../user';

export class UserUpdateDto extends PartialType(
  OmitType(User, ['_id', 'email'] as const)
) {}

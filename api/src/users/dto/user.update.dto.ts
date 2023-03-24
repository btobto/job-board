import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UserUpdateDto extends PartialType(
  OmitType(UserDto, ['_id', 'email'] as const),
) {}

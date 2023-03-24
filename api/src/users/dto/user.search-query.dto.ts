import { PartialType, PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UserSearchQueryDto extends PartialType(
  PickType(UserDto, ['name', 'location', 'skills']),
) {}

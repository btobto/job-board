import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../user';

export class UserSearchQueryDto extends PartialType(
  PickType(User, ['name', 'location', 'skills'])
) {}

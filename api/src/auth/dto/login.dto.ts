import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserType } from '../../common/enums';

export interface LoginDto {
  email: string;
  password: string;
  type: UserType;
}

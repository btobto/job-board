import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../enums';

export interface LoginDto {
  email: string;
  password: string;
  type: Role;
}

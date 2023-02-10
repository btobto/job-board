import {
  ArrayUnique,
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Location } from '../location/location';
import { WorkExperience } from '../workExperience/workExperience';

export class User {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @ValidateNested()
  location: Location;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  skills: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  prevExperience: WorkExperience[];
}

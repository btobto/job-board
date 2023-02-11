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
import { WorkExperience } from '../workExperience/work-experience';
import { Type } from 'class-transformer';

export class User {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  skills: string[];

  @IsOptional()
  @IsArray()
  @Type(() => WorkExperience)
  @ValidateNested()
  prevExperience: WorkExperience[];
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Company } from '../company/company';
import { Location } from '../location/location';
import { User } from '../user/user';

export class Posting {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @Type(() => Company)
  company: Company;

  @IsOptional()
  @Type(() => Location)
  @ValidateNested()
  location: Location;

  @IsNotEmpty()
  position: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsDate()
  datePosted: Date;

  @IsNotEmpty()
  @IsBoolean()
  remote: boolean;

  @IsNotEmpty()
  @IsArray()
  requirements: string[];

  @IsOptional()
  @IsArray()
  @Type(() => User)
  @ValidateNested()
  applicants: User[];
}

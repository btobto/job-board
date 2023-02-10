import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Location } from '../location/location';
import { User } from '../user/user';

export class Posting {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsMongoId()
  @IsNotEmpty()
  companyId: string;

  @IsOptional()
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
  @ValidateNested()
  applicants: User[];
}

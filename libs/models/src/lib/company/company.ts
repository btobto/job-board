import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsFQDN,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Location } from '../location/location';

export class Company {
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
  @IsFQDN()
  website: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  @Type(() => Location)
  @ValidateNested()
  offices: Location[];

  @IsNotEmpty()
  ratingsSum: number;

  @IsNotEmpty()
  ratingsCount: number;
}

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
import { LocationDto } from 'src/common/dto';

export class CompanyDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  @IsFQDN()
  website: string;

  @IsOptional()
  description: string;

  @IsArray()
  @Type(() => LocationDto)
  @ValidateNested()
  locations: LocationDto[];

  @IsNotEmpty()
  ratingsSum: number;

  @IsNotEmpty()
  ratingsCount: number;
}

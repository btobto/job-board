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

  @IsOptional()
  @IsFQDN()
  website: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  @Type(() => LocationDto)
  @ValidateNested()
  offices: LocationDto[];

  @IsNotEmpty()
  ratingsSum: number;

  @IsNotEmpty()
  ratingsCount: number;
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from 'src/common/dto';
import { CompanyDto } from 'src/companies/dto';
import { PersonDto } from 'src/persons/dto/person.dto';

export class PostingDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @Type(() => CompanyDto)
  company: CompanyDto;

  @IsOptional()
  @Type(() => LocationDto)
  @ValidateNested()
  location: LocationDto;

  @IsNotEmpty()
  position: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsDate()
  datePosted: Date;

  @IsNotEmpty()
  @IsBoolean()
  remoteAvailable: boolean;

  @IsOptional()
  salary: string;

  @IsNotEmpty()
  @IsArray()
  requirements: string[];

  @IsOptional()
  @IsArray()
  @Type(() => PersonDto)
  @ValidateNested()
  applicants: PersonDto[];
}

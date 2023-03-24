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
import { LocationDto } from 'src/common/dto';
import { CompanyDto } from 'src/companies/dto';
import { UserDto } from 'src/users/dto/user.dto';

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
  remote: boolean;

  @IsNotEmpty()
  @IsArray()
  requirements: string[];

  @IsOptional()
  @IsArray()
  @Type(() => UserDto)
  @ValidateNested()
  applicants: UserDto[];
}

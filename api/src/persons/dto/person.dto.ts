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
import { Type } from 'class-transformer';
import { LocationDto, WorkExperienceDto } from 'src/common/dto';
import { Education } from 'src/common/dto/education.dto';

export class PersonDto {
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
  about: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  skills: string[];

  @IsOptional()
  @IsArray()
  @Type(() => WorkExperienceDto)
  @ValidateNested()
  prevExperience: WorkExperienceDto[];

  @IsOptional()
  @IsArray()
  @Type(() => Education)
  @ValidateNested()
  education: Education[];
}

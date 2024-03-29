import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class WorkExperienceDto {
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  position: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  skills: string[];

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  yearFrom: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  yearTo: number;
}

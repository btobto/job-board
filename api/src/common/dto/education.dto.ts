import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  isNotEmpty,
  isPositive,
} from 'class-validator';

export class Education {
  @IsNotEmpty()
  school: string;

  @IsOptional()
  degree: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  grade: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  yearFrom: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  yearTo: number;
}

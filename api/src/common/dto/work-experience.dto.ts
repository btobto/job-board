import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class WorkExperienceDto {
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  yearFrom: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  yearTo: number;
}

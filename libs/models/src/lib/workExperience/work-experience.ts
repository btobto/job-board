import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class WorkExperience {
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  fromYear: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  toYear: number;
}

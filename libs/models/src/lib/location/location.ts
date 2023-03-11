import { IsNotEmpty, IsOptional } from 'class-validator';

export class Location {
  @IsNotEmpty()
  country: string;

  @IsOptional()
  city: string;

  @IsOptional()
  address?: string;
}

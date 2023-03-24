import { IsNotEmpty, IsOptional } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  country: string;

  @IsOptional()
  city: string;

  @IsOptional()
  address?: string;
}

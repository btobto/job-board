import { IsNotEmpty, IsOptional } from 'class-validator';

export class Location {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  address: string;
}

import {
  IsDate,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class Review {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @IsMongoId()
  companyId: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsDate()
  datePosted: Date;
}

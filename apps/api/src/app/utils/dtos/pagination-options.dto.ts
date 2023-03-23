import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { DefaultValue } from '../decorators/default-value.decorator';

export class PaginationOptionsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(15)
  take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

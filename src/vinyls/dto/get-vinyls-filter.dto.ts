import { IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetVinylsFilterDto {
  search: string;

  @IsOptional()
  @IsIn(['price', 'name', 'authorName'])
  sort: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  page: number;
}

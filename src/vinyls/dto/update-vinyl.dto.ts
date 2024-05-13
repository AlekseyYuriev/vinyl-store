import { IsDecimal, IsOptional, IsString } from 'class-validator';

export class UpdateVinylDTO {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly authorName: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsDecimal()
  @IsOptional()
  readonly price: number;

  @IsString()
  @IsOptional()
  readonly image: string;
}

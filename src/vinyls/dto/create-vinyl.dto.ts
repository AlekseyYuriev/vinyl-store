import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVinylDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly authorName: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDecimal()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsOptional()
  readonly image?: string;
}

import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReviewDTO {
  @IsString()
  @IsNotEmpty()
  readonly comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  readonly score: number;
}

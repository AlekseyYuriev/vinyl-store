import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from './dto/create-review.dto';
import { Review } from './review.entity';
import { JwtCookieAuthGuard } from 'src/auth/jwt-cookies-guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @UseGuards(JwtCookieAuthGuard)
  @Post('/:id')
  create(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body()
    createReviewDTO: CreateReviewDTO,
  ): Promise<Review> {
    return this.reviewsService.create(req.user.userId, id, createReviewDTO);
  }
}

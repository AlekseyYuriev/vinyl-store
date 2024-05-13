import {
  Body,
  Controller,
  Delete,
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
import { DeleteResult } from 'typeorm';
import { JwtCookieAuthAdminGuard } from 'src/auth/jwt-cookies-admin-guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post('/:id')
  @UseGuards(JwtCookieAuthGuard)
  create(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body()
    createReviewDTO: CreateReviewDTO,
  ): Promise<Review> {
    console.log(req.user);
    return this.reviewsService.create(req.user.userId, id, createReviewDTO);
  }

  @Delete('/:id')
  @UseGuards(JwtCookieAuthAdminGuard)
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.reviewsService.remove(id);
  }
}

import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Vinyl, User])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}

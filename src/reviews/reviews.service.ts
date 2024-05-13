import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import { User } from 'src/users/user.entity';
import { CreateReviewDTO } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Vinyl)
    private vinylRepository: Repository<Vinyl>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    vinylId: number,
    reviewDTO: CreateReviewDTO,
  ): Promise<Review> {
    const review = new Review();
    review.comment = reviewDTO.comment;
    review.score = reviewDTO.score;

    const vinyl = await this.vinylRepository.findOneBy({
      id: vinylId,
    });
    review.vinyl = vinyl;

    const user = await this.userRepository.findOneBy({ id: userId });
    review.user = user;

    return this.reviewRepository.save(review);
  }

  async remove(reviewId: number): Promise<DeleteResult> {
    const review = await this.reviewRepository.findOneBy({
      id: reviewId,
    });
    if (!review) {
      throw new NotFoundException(`Review with ID "${reviewId}" not found`);
    }
    return await this.reviewRepository.delete(reviewId);
  }

  async getReviewsByVinylId(
    vinylId: number,
    page: number,
    limit: number,
  ): Promise<object[]> {
    const reviews = await this.reviewRepository.find({
      relations: {
        user: true,
        vinyl: true,
      },
      where: {
        vinyl: {
          id: vinylId,
        },
      },
      take: limit,
      skip: page > 1 ? (page - 1) * limit : 0,
    });

    const result = reviews.map((review) => {
      return {
        commentedByUser: `${review.user.firstName} ${review.user.lastName}`,
        comment: review.comment,
        score: review.score,
        vinylName: review.vinyl.name,
        vinylAuthorName: review.vinyl.authorName,
        vinylPrice: review.vinyl.price,
      };
    });

    return result;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
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

  async create(userId, vinylId, reviewDTO: CreateReviewDTO): Promise<Review> {
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
}

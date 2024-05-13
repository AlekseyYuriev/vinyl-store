import { User } from 'src/users/user.entity';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum Score {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column({
    type: 'enum',
    enum: Score,
  })
  score: Score;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Vinyl, (vinyl) => vinyl.reviews)
  @JoinColumn({ name: 'vinylId' })
  vinyl: Vinyl;
}

import { Exclude } from 'class-transformer';
import { Review } from 'src/reviews/review.entity';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  birthdate: string;

  @Column()
  avatar: string;

  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
  })
  reviews: Review[];

  @ManyToMany(() => Vinyl, (vinyl) => vinyl.users)
  purchasedVinyls: Vinyl[];
}

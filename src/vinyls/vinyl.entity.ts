import { Admin } from 'src/admins/admin.entity';
import { Review } from 'src/reviews/review.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vinyls')
export class Vinyl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  authorName: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column()
  image?: string;

  @OneToMany(() => Review, (review) => review.vinyl, {
    cascade: true,
  })
  reviews: Review[];

  @ManyToMany(() => User, (user) => user.purchasedVinyls, { cascade: true })
  @JoinTable({ name: 'user_purchased_vinyls' })
  users: User[];

  @ManyToOne(() => Admin, (admin) => admin.vinyls)
  @JoinColumn({ name: 'adminId' })
  admin: Admin;
}

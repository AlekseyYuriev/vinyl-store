import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    example: "Diamonds Are a Girl's Best Friend",
    description: 'provide the name of the vinyl',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Marilyn Monroe',
    description: 'provide the authorName of the vinyl',
  })
  @Column()
  authorName: string;

  @ApiProperty({
    example: `The icon of icons is celebrated on this limited edition colored vinyl 7" featuring Marilyn Monroe's signature classic "Diamonds Are A Girl's Best Friend," from the 1953 film extravaganza Gentlemen Prefer Blondes! The B-side is a remix by rockabilly guitarist Danny B. Harvey which appeared in the hit movie Burlesque starring Cher and Christina Aguilera!`,
    description: 'provide the description of the vinyl',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: '17.99',
    description: 'provide the price of the vinyl',
  })
  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @ApiProperty({
    example:
      'https://thesoundofvinyl.us/cdn/shop/products/mari_b08f3a91-922b-4a3a-8aef-b71661c3c09e_650x650.png?v=1663085342',
    description: 'provide the image of the vinyl',
  })
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

import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    example: 'John',
    description: 'provide the firstName of the user',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Lennon',
    description: 'provide the lastName of the user',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'john.lennon@gmail.com',
    description: 'provide the email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'provide the password of the user',
  })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    example: '09.10.1980',
    description: 'provide the birthdate of the user',
  })
  @Column()
  birthdate: string;

  @ApiProperty({
    example:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/John_Lennon%2C_1974_%28restored_cropped%29.jpg/800px-John_Lennon%2C_1974_%28restored_cropped%29.jpg',
    description: 'provide the avatar of the user',
  })
  @Column()
  avatar: string;

  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
  })
  reviews: Review[];

  @ManyToMany(() => Vinyl, (vinyl) => vinyl.users)
  purchasedVinyls: Vinyl[];
}

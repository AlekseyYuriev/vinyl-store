import { User } from 'src/users/user.entity';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Vinyl, (vinyl) => vinyl.admin, {
    cascade: true,
  })
  vinyls: Vinyl[];
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6MSwiYWRtaW5JZCI6MSwiaWF0IjoxNzE1MDIyMjg0LCJleHAiOjE3MTUxMDg2ODR9.RpdAaaCtR3DtXsU9s55EhFwOvX31j-ZOsrK8UUfwxyI

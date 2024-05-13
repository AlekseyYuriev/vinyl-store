import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserDetails } from 'src/auth/utils/typesGoogle';
import { UpdateUserDto } from './dto/update-user.dto';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Vinyl)
    private readonly vinylsRepository: Repository<Vinyl>,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, salt);
    const user = await this.usersRepository.save(createUserDTO);
    delete user.password;
    return user;
  }

  async findOne(loginUserDTO: LoginUserDTO): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: loginUserDTO.email,
    });
    if (!user) {
      throw new UnauthorizedException(
        `User with Email "${loginUserDTO.email}" not found`,
      );
    }
    return user;
  }

  async findOneByEmail(details: UserDetails): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: details.email,
    });
    if (!user) {
      throw new UnauthorizedException(
        `User with Email "${details.email}" not found`,
      );
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new UnauthorizedException(`User not found`);
    }
    return user;
  }

  async getUserProfile(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: { reviews: true, purchasedVinyls: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    delete user.password;
    delete user.id;
    delete user.email;
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.birthdate = updateUserDto.birthdate;
    user.avatar = updateUserDto.avatar;

    await this.usersRepository.save(user);
    delete user.password;
    delete user.id;
    delete user.email;
    return user;
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return await this.usersRepository.delete(id);
  }

  async purchaseVinyl(userId: number, vinylId: number): Promise<Vinyl> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { purchasedVinyls: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    const vinyl = await this.vinylsRepository.findOneBy({ id: vinylId });
    if (!vinyl) {
      throw new NotFoundException(`Vinyl with ID "${vinylId}" not found`);
    }

    user.purchasedVinyls.push(vinyl);
    await this.usersRepository.save(user);
    await this.vinylsRepository.save(vinyl);

    this.mailerService
      .sendMail({
        to: user.email,
        from: 'leverx.nodemailer@mail.ru',
        subject: 'Vinyl Purchase Notification',
        text: `Congratulations! You've made a great purchase!

            Vinyl:
            name: ${vinyl.name}
            authorName: ${vinyl.authorName}
            price: ${vinyl.price}`,
      })
      .then((info) => {
        console.log('Message sent:', info);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

    return vinyl;
  }
}

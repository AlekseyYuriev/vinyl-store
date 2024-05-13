import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AdminsService } from 'src/admins/admins.service';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { PayloadType } from './types';
import { UserDetails } from './utils/typesGoogle';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private adminsService: AdminsService,
  ) {}

  async login(
    loginUserDTO: LoginUserDTO,
    response,
  ): Promise<{ message: string }> {
    const user = await this.usersService.findOne(loginUserDTO);
    const matched = await bcrypt.compare(loginUserDTO.password, user.password);

    if (matched) {
      delete user.password;

      const payload: PayloadType = { email: user.email, userId: user.id };
      const admin = await this.adminsService.findAdmin(user.id);
      if (admin) {
        payload.adminId = admin.id;
      }

      const jwt = await this.jwtService.signAsync(payload);

      response.cookie('jwt', jwt, { httpOnly: true });
      return {
        message: 'success',
      };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }

  // for log in to the system using Google SSO

  async validateUser(details: UserDetails) {
    const user = await this.usersService.findOneByEmail(details);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('User not found');
    }
  }

  async findUser(id: number) {
    const user = await this.usersService.findOneById(id);
    return user;
  }
}

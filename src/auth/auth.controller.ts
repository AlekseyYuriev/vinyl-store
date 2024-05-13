import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './utils/Guards';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('register')
  register(
    @Body()
    createUserDTO: CreateUserDTO,
  ): Promise<User> {
    return this.usersService.create(createUserDTO);
  }

  @Post('login')
  login(
    @Body()
    loginUserDTO: LoginUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginUserDTO, response);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }

  //api/auth/google/login
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  //api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'OK' };
  }
}

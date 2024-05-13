import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtCookieAuthGuard } from 'src/auth/jwt-cookies-guard';
import { DeleteResult } from 'typeorm';
import { Vinyl } from 'src/vinyls/vinyl.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtCookieAuthGuard)
  @Get('/me')
  getUserProfile(@Req() req): Promise<User> {
    return this.usersService.getUserProfile(req.user.userId);
  }

  @UseGuards(JwtCookieAuthGuard)
  @Patch('/me')
  updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(req.user.userId, updateUserDto);
  }

  @UseGuards(JwtCookieAuthGuard)
  @Delete('/me')
  deleteUser(@Req() req): Promise<DeleteResult> {
    return this.usersService.deleteUser(req.user.userId);
  }

  @UseGuards(JwtCookieAuthGuard)
  @Post('/purchasedvinyls/:id')
  purchaseVinyl(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Vinyl> {
    return this.usersService.purchaseVinyl(req.user.userId, id);
  }
}

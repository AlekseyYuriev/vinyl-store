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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtCookieAuthGuard)
  @Get('/me')
  @ApiOperation({ summary: 'Get user profile by user ID' })
  @ApiResponse({ status: 200 })
  getUserProfile(@Req() req): Promise<User> {
    return this.usersService.getUserProfile(req.user.userId);
  }

  @UseGuards(JwtCookieAuthGuard)
  @Patch('/me')
  @ApiOperation({
    summary:
      'Update user profile by user ID  including first name, last name, birthdate, and avatar',
  })
  @ApiResponse({ status: 200 })
  updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(req.user.userId, updateUserDto);
  }

  @UseGuards(JwtCookieAuthGuard)
  @Delete('/me')
  @ApiOperation({
    summary: 'Delete user profile',
  })
  @ApiResponse({ status: 200 })
  deleteUser(@Req() req): Promise<DeleteResult> {
    return this.usersService.deleteUser(req.user.userId);
  }

  @UseGuards(JwtCookieAuthGuard)
  @Post('/purchasedvinyls/:id')
  @ApiOperation({
    summary: 'Purchase a vinyl',
  })
  @ApiResponse({ status: 201 })
  purchaseVinyl(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Vinyl> {
    return this.usersService.purchaseVinyl(req.user.userId, id);
  }
}

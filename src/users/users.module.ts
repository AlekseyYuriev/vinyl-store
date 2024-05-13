import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import { User } from './user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { LoggerService } from 'src/logger.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Vinyl, User]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.ru',
        auth: {
          user: 'leverx.nodemailer@mail.ru',
          pass: '8FcTizrJsGa77DqpqCFP',
        },
      },
    }),
  ],
  providers: [UsersService, LoggerService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { AdminsModule } from 'src/admins/admins.module';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';
import { LoggerService } from 'src/logger.service';

@Module({
  imports: [
    UsersModule,
    AdminsModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    SessionSerializer,
    LoggerService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

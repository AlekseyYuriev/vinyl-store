import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinylsModule } from './vinyls/vinyls.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { PassportModule } from '@nestjs/passport';
import { dataSourceOptions } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(dataSourceOptions),
    VinylsModule,
    UsersModule,
    ReviewsModule,
    AuthModule,
    AdminsModule,
    PassportModule.register({ session: true }),
    SeedModule,
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {}

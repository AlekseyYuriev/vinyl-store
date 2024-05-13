import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VinylsModule } from './vinyls/vinyls.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { VinylsController } from './vinyls/vinyls.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { PassportModule } from '@nestjs/passport';
import { dataSourceOptions } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';

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
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(VinylsController);
  }
}

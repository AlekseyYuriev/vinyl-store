import { Module } from '@nestjs/common';
import { VinylsController } from './vinyls.controller';
import { VinylsService } from './vinyls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vinyl } from './vinyl.entity';
import { Admin } from 'src/admins/admin.entity';
import { LoggerService } from 'src/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vinyl, Admin])],
  controllers: [VinylsController],
  providers: [VinylsService, LoggerService],
})
export class VinylsModule {}

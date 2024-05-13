import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Vinyl } from 'src/vinyls/vinyl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Vinyl])],
  providers: [AdminsService],
  controllers: [AdminsController],
  exports: [AdminsService],
})
export class AdminsModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {}

  findAdmin(userId: number): Promise<Admin> {
    return this.adminsRepository.findOneBy({ user: { id: userId } });
  }
}

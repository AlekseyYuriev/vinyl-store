import { Injectable, NotFoundException } from '@nestjs/common';
import { Vinyl } from './vinyl.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateVinylDTO } from './dto/create-vinyl.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateVinylDTO } from './dto/update-vinyl.dto';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Admin } from 'src/admins/admin.entity';

@Injectable()
export class VinylsService {
  constructor(
    @InjectRepository(Vinyl)
    private vinylsRepository: Repository<Vinyl>,
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {}

  async create(vinylDTO: CreateVinylDTO, user): Promise<Vinyl> {
    const vinyl = new Vinyl();
    vinyl.name = vinylDTO.name;
    vinyl.authorName = vinylDTO.authorName;
    vinyl.description = vinylDTO.description;
    vinyl.price = Number(vinylDTO.price);
    vinyl.image = vinylDTO.image ? vinylDTO.image : '';

    const admin = await this.adminsRepository.findOneBy(user.adminId);
    vinyl.admin = admin;

    return await this.vinylsRepository.save(vinyl);
  }

  async findAll(): Promise<object[]> {
    const vinyls = await this.vinylsRepository.find({
      relations: { reviews: true },
    });

    const result = vinyls.map((vinyl) => {
      return {
        name: vinyl.name,
        authorName: vinyl.authorName,
        description: vinyl.description,
        price: vinyl.price,
        image: vinyl.image,
        firstReview:
          vinyl.reviews.length > 0
            ? {
                comment: vinyl.reviews[0].comment,
                score: vinyl.reviews[0].score,
              }
            : {},
      };
    });

    return result;
  }

  async findOne(id: number): Promise<Vinyl> {
    return await this.vinylsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    const vinyl = await this.vinylsRepository.findOneBy({ id });
    if (!vinyl) {
      throw new NotFoundException(`Vinyl with ID "${id}" not found`);
    }
    return await this.vinylsRepository.delete(id);
  }

  async update(
    id: number,
    updateVinylDto: UpdateVinylDTO,
  ): Promise<UpdateResult> {
    const vinyl = await this.vinylsRepository.findOneBy({ id });
    if (!vinyl) {
      throw new NotFoundException(`Vinyl with ID "${id}" not found`);
    }
    return await this.vinylsRepository.update(id, updateVinylDto);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Vinyl>> {
    const queryBuilder = this.vinylsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.authorName', 'DESC');

    return paginate<Vinyl>(queryBuilder, options);
  }
}

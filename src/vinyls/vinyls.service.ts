import { Injectable, NotFoundException } from '@nestjs/common';
import { Vinyl } from './vinyl.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateVinylDTO } from './dto/create-vinyl.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateVinylDTO } from './dto/update-vinyl.dto';
import { Admin } from 'src/admins/admin.entity';
import { GetVinylsFilterDto } from './dto/get-vinyls-filter.dto';

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

  async findAll(page: number, limit: number): Promise<object[]> {
    const vinyls = await this.vinylsRepository.find({
      relations: {
        reviews: true,
      },
      take: limit ? limit : 10,
      skip: page > 1 ? (page - 1) * (limit ? limit : 10) : 0,
      order: {
        id: 'ASC',
      },
    });

    const result = vinyls.map((vinyl) => {
      let allScore = 0;
      let count = 0;
      vinyl.reviews.forEach((review) => {
        allScore += review.score;
        count += 1;
      });
      return {
        name: vinyl.name,
        authorName: vinyl.authorName,
        description: vinyl.description,
        price: vinyl.price,
        firstReview:
          vinyl.reviews.length > 0 ? vinyl.reviews[0].comment : 'no reviews',
        averageScore: allScore ? (allScore / count).toFixed(2) : 'no scores',
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

  async getVinyls(filterDto: GetVinylsFilterDto): Promise<Vinyl[]> {
    const { search, sort, limit, page } = filterDto;
    const query = this.vinylsRepository
      .createQueryBuilder('vinyls')
      .take(limit ? limit : 10)
      .skip(page > 1 ? (page - 1) * (limit ? limit : 10) : 0)
      .orderBy(sort ? `vinyls.${sort}` : 'vinyls.id', 'ASC');

    if (search) {
      query.where(
        'LOWER(vinyls.name) LIKE :search OR LOWER(vinyls.authorName) LIKE LOWER(:search)',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );
    }
    const vinyls = await query.getMany();
    return vinyls;
  }
}

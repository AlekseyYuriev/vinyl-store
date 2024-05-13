import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import { CreateVinylDTO } from './dto/create-vinyl.dto';
import { Vinyl } from './vinyl.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateVinylDTO } from './dto/update-vinyl.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtCookieAuthAdminGuard } from 'src/auth/jwt-cookies-admin-guard';

@Controller('vinyls')
export class VinylsController {
  constructor(private vinylsService: VinylsService) {}
  @Post()
  @UseGuards(JwtCookieAuthAdminGuard)
  create(
    @Body() createVinylDTO: CreateVinylDTO,
    @Request()
    request,
  ): Promise<Vinyl> {
    return this.vinylsService.create(createVinylDTO, request.user);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Vinyl>> {
    limit = limit > 100 ? 100 : limit;
    return this.vinylsService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Vinyl> {
    return this.vinylsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtCookieAuthAdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVinylDto: UpdateVinylDTO,
  ): Promise<UpdateResult> {
    return this.vinylsService.update(id, updateVinylDto);
  }

  @Delete(':id')
  @UseGuards(JwtCookieAuthAdminGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.vinylsService.remove(id);
  }
}
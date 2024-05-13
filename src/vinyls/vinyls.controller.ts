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
  ValidationPipe,
} from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import { CreateVinylDTO } from './dto/create-vinyl.dto';
import { Vinyl } from './vinyl.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateVinylDTO } from './dto/update-vinyl.dto';
import { JwtCookieAuthAdminGuard } from 'src/auth/jwt-cookies-admin-guard';
import { GetVinylsFilterDto } from './dto/get-vinyls-filter.dto';

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
    @Query('page', new DefaultValuePipe(0), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<object[]> {
    limit = limit > 15 ? 15 : limit;
    return this.vinylsService.findAll(page, limit);
  }

  @Get('/search')
  findVinylsWithSearchAndSorting(
    @Query(ValidationPipe) filterDto: GetVinylsFilterDto,
  ): Promise<Vinyl[]> {
    return this.vinylsService.getVinyls(filterDto);
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

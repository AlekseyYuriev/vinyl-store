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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/logger.service';

@Controller('vinyls')
@ApiTags('Vinyls')
export class VinylsController {
  constructor(
    private vinylsService: VinylsService,
    private readonly logger: LoggerService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Add new Vinyl to the store' })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtCookieAuthAdminGuard)
  create(
    @Body() createVinylDTO: CreateVinylDTO,
    @Request()
    request,
  ): Promise<Vinyl> {
    this.logger.log('This log from create Vinyl');
    return this.vinylsService.create(createVinylDTO, request.user);
  }

  @Get()
  @ApiOperation({
    summary:
      'Get vinyl list including price, name, author name, description, the first review from another user, and the average score based on reviews.',
  })
  @ApiResponse({ status: 200 })
  findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<object[]> {
    return this.vinylsService.findAll(page, limit);
  }

  @Get('/search')
  @ApiOperation({
    summary: 'Find Vinyls with search and sorting.',
  })
  @ApiResponse({ status: 200 })
  findVinylsWithSearchAndSorting(
    @Query(ValidationPipe) filterDto: GetVinylsFilterDto,
  ): Promise<Vinyl[]> {
    return this.vinylsService.getVinyls(filterDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find Vinyl by ID.',
  })
  @ApiResponse({ status: 200 })
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
  @ApiOperation({
    summary: 'Update Vinyl in the store.',
  })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtCookieAuthAdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVinylDto: UpdateVinylDTO,
  ): Promise<UpdateResult> {
    this.logger.log('This log from update Vinyl');
    return this.vinylsService.update(id, updateVinylDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Vinyl from the store.',
  })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtCookieAuthAdminGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    this.logger.log(`This log from delete Vinyl with ID ${id}`);
    return this.vinylsService.remove(id);
  }
}

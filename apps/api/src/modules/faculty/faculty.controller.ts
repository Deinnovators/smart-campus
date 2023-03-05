import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  // eslint-disable-next-line prettier/prettier
  Post,
} from '@nestjs/common';
import { Faculty, Prisma } from 'database';
import { FacultyService } from './faculty.service';

@Controller('faculties')
export class FacultyController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: FacultyService) {}

  @Get()
  async getFaculties() {
    return this.service.findMany();
  }

  @Get(':id')
  async getFaculty(@Param('id', ParseIntPipe) id): Promise<Faculty> {
    return this.service.findOne({ where: { id: id } });
  }

  @Patch(':id')
  async updateFaculty(
    @Param() params,
    @Body() data: Prisma.FacultyCreateInput,
  ): Promise<Faculty> {
    return this.service.update(+params.id, data);
  }

  @Delete(':id')
  async deleteFaculty(@Param() params) {
    return this.service.deleteOne(+params.id);
  }

  @Post('/create')
  async createFaculty(
    @Body() data: Prisma.FacultyCreateInput,
  ): Promise<Faculty> {
    return this.service.create(data);
  }
}

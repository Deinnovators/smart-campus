import { Prisma } from 'database';
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseFilters,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { AccessRoles } from '@api/decorators/roles.decorator';
import { GlobalExceptionFilter } from '@api/exceptions/exception-filter';

@Controller('faculty')
@UseFilters(GlobalExceptionFilter)
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @AccessRoles('superadmin', 'admin')
  @Post('/')
  create(@Body() data: Prisma.FacultyCreateInput) {
    return this.facultyService.create(data);
  }

  @AccessRoles('superadmin', 'admin')
  @Get()
  findAll() {
    return this.facultyService.findAll();
  }

  @AccessRoles('superadmin', 'admin')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facultyService.findOne(+id);
  }

  @AccessRoles('superadmin', 'admin')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.FacultyUpdateInput,
  ) {
    return this.facultyService.update(+id, data);
  }

  @AccessRoles('superadmin', 'admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facultyService.remove(+id);
  }
}

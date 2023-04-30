import { Prisma } from 'database';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { AccessRoles } from '@api/decorators/roles.decorator';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @AccessRoles('superadmin', 'admin')
  @Post('/create')
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
  findOne(@Param('id') id: string) {
    return this.facultyService.findOne(+id);
  }

  @AccessRoles('superadmin', 'admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.FacultyUpdateInput) {
    return this.facultyService.update(+id, data);
  }

  @AccessRoles('superadmin', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultyService.remove(+id);
  }
}

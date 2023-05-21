import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CourseOffering } from '@prisma/client';
import { CourseOfferingService } from './course-offering.service';
import { AccessRoles } from '@api/decorators/roles.decorator';

@Controller('course-offerings')
export class CourseOfferingController {
  constructor(private readonly courseOfferingService: CourseOfferingService) {}

  @Get()
  async findAll(): Promise<CourseOffering[]> {
    return this.courseOfferingService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CourseOffering> {
    return this.courseOfferingService.findOne(+id);
  }

  @AccessRoles('superadmin', 'admin')
  @Post()
  async create(@Body() data: CourseOffering): Promise<CourseOffering> {
    return this.courseOfferingService.create(data);
  }

  @AccessRoles('superadmin', 'admin')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CourseOffering,
  ): Promise<CourseOffering> {
    return this.courseOfferingService.update(id, data);
  }

  @AccessRoles('superadmin', 'admin')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<CourseOffering> {
    return this.courseOfferingService.delete(id);
  }
}

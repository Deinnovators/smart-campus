import { CourseDistribution, Section, Semester } from '.prisma/client';
import { CourseDistributionService } from './course-distribution.service';
import { GlobalExceptionFilter } from '@api/exceptions/exception-filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { AccessRoles } from '@api/decorators/roles.decorator';

@Controller('course-distribution')
@UseFilters(GlobalExceptionFilter)
export class CourseDistributionController {
  constructor(private readonly service: CourseDistributionService) {}
  @Get()
  async getDistributedCourses(): Promise<CourseDistribution[]> {
    return this.service.getDistributedCourses();
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CourseDistribution> {
    return this.service.getById(id);
  }

  //not working
  @Get('/department')
  async getDistributionByQuery(
    @Query('id') id: number,
    @Query('section') section?: Section,
    @Query('year') year?: string,
    @Query('semester') semester?: Semester,
  ): Promise<CourseDistribution[]> {
    return this.service.getDistributionByQuery(id, section, year, semester);
  }

  @AccessRoles('superadmin', 'admin')
  @Post()
  async createDistribution(
    @Body() data: CourseDistribution,
  ): Promise<CourseDistribution> {
    return this.service.createDistribution(data);
  }

  @AccessRoles('superadmin', 'admin')
  @Patch(':id')
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CourseDistribution,
  ): Promise<CourseDistribution> {
    return this.service.updateCourse(id, data);
  }

  @AccessRoles('superadmin', 'admin')
  @Delete(':id')
  async deleteCourse(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CourseDistribution> {
    return this.service.deleteCourse(id);
  }
}

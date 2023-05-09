import { AccessRoles } from '@api/decorators/roles.decorator';
import { GlobalExceptionFilter } from '@api/exceptions/exception-filter';
import { CourseService } from '@api/modules/faculty-activity/course/course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Course } from 'database';

@Controller('course')
@UseFilters(GlobalExceptionFilter)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // @AccessRoles('superadmin', 'admin')

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findOneCourse(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOne(parseInt(id));
  }

  @Post()
  async createCourse(@Body() data: Course): Promise<Course> {
    return this.courseService.create(data);
  }

  @Patch(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() data: Course,
  ): Promise<Course> {
    return this.courseService.update(parseInt(id), data);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string): Promise<Course> {
    return this.courseService.delete(parseInt(id));
  }
}

import { AccessRoles } from '@api/decorators/roles.decorator';
import { GlobalExceptionFilter } from '@api/exceptions/exception-filter';
import { CourseService } from '@api/modules/faculty-activity/course/course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Course } from 'database';

@Controller('course')
@UseFilters(GlobalExceptionFilter)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id', ParseIntPipe) id: number): Promise<Course> {
    return this.courseService.getCourseById(id);
  }

  @Get('/department/:id')
  async getCourseByDepartmentId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Course[]> {
    return this.courseService.getCourseByDepartmentId(id);
  }

  @AccessRoles('superadmin', 'admin')
  @Post()
  async createCourse(@Body() data: Course): Promise<Course> {
    return this.courseService.createCourse(data);
  }

  @AccessRoles('superadmin', 'admin')
  @Patch(':id')
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Course,
  ): Promise<Course> {
    return this.courseService.updateCourse(id, data);
  }

  @AccessRoles('superadmin', 'admin')
  @Delete(':id')
  async deleteCourse(@Param('id', ParseIntPipe) id: number): Promise<Course> {
    return this.courseService.deleteCourse(id);
  }
}

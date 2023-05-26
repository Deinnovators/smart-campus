import { Injectable } from '@nestjs/common';
import { Course } from '.prisma/client';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getAllCourses(): Promise<Course[]> {
    try {
      const courses = await this.prisma.course.findMany({
        orderBy: { id: 'asc' },
        include: {
          department: true,
          CourseCurriculum: true,
          CourseOffering: true,
        },
      });
      return courses;
    } catch (error) {
      throw new Error('Failed to fetch courses');
    }
  }

  async getCourseById(id: number): Promise<Course[]> {
    try {
      const course = await this.prisma.course.findMany({
        where: { id },
        include: {
          department: true,
          CourseCurriculum: true,
          CourseOffering: {
            include: {
              // course: true,
              teacher: true,
              CourseDistribution: {
                include: {
                  department: true,
                },
              },
            },
          },
        },
      });

      if (!course) {
        throw new Error(`Course with id ${id} not found`);
      }

      return course;
    } catch (error) {
      throw new Error(`Failed to fetch course with id ${id}`);
    }
  }

  async getCourseByDepartmentId(id: number): Promise<Course[]> {
    try {
      const courses = await this.prisma.course.findMany({
        where: { departmentId: id },
        include: {
          department: true,
          CourseCurriculum: true,
          CourseOffering: true,
        },
      });

      if (!courses) {
        throw new Error(`Courses with department id ${id} not found`);
      }
      return courses;
    } catch (error) {
      throw new Error(`Failed to fetch course with department id ${id}`);
    }
  }

  async createCourse(data: Course): Promise<Course> {
    try {
      return await this.prisma.course.create({ data });
    } catch (error) {
      throw new Error('Failed to create course');
    }
  }

  async updateCourse(id: number, data: Course): Promise<Course> {
    try {
      const course = await this.prisma.course.update({
        where: { id },
        data,
        include: {
          department: true,
          CourseCurriculum: true,
          CourseOffering: true,
        },
      });

      if (!course) {
        throw new Error(`Course with id ${id} not found`);
      }

      return course;
    } catch (error) {
      throw new Error(`Failed to update course with id ${id}`);
    }
  }

  async deleteCourse(id: number): Promise<Course> {
    try {
      const course = await this.prisma.course.delete({
        where: { id },
      });

      if (!course) {
        throw new Error(`Course with id ${id} not found`);
      }

      return course;
    } catch (error) {
      throw new Error(`Failed to delete course with id ${id}`);
    }
  }
}

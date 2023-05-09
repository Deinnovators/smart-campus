import { Injectable } from '@nestjs/common';
import { Course } from '.prisma/client';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  async findOne(id: number): Promise<Course> {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async create(data: Course): Promise<Course> {
    return this.prisma.course.create({
      data,
    });
  }

  async update(id: number, data: Course): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Course> {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}

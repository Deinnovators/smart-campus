import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Faculty, Prisma } from '@prisma/client';

@Injectable()
export class FacultyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.FacultyCreateInput): Promise<Faculty> {
    return this.prisma.faculty.create({
      data,
    });
  }

  async findAll(): Promise<Faculty[]> {
    const faculties = await this.prisma.faculty.findMany({
      orderBy: { id: 'asc' }, // Sort by id in ascending order
    });

    return faculties;
  }

  async findOne(id: number): Promise<Faculty> {
    return this.prisma.faculty.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.FacultyUpdateInput): Promise<Faculty> {
    const faculty = await this.prisma.faculty.update({
      where: { id },
      data,
    });

    return faculty;
  }

  async remove(id: number): Promise<void> {
    await this.prisma.faculty.delete({ where: { id } });
  }
}

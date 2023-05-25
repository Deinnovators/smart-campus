import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Faculty, Prisma } from '@prisma/client';

@Injectable()
export class FacultyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.FacultyCreateInput): Promise<Faculty> {
    try {
      return await this.prisma.faculty.create({ data });
    } catch (error) {
      throw new Error('Failed to create faculty');
    }
  }

  async findAll(): Promise<Faculty[]> {
    try {
      const faculties = await this.prisma.faculty.findMany({
        orderBy: { id: 'asc' },
        include: { departments: true },
      });

      return faculties;
    } catch (error) {
      throw new Error('Failed to fetch faculties');
    }
  }

  async findOne(id: number): Promise<Faculty> {
    try {
      const faculty = await this.prisma.faculty.findUnique({
        where: { id },
        include: { departments: true },
      });

      if (!faculty) {
        throw new Error(`Faculty with id ${id} not found`);
      }

      return faculty;
    } catch (error) {
      throw new Error(`Failed to fetch faculty with id ${id}`);
    }
  }

  async update(id: number, data: Prisma.FacultyUpdateInput): Promise<Faculty> {
    try {
      const faculty = await this.prisma.faculty.update({
        where: { id },
        data,
      });

      if (!faculty) {
        throw new Error(`Faculty with id ${id} not found`);
      }

      return faculty;
    } catch (error) {
      throw new Error(`Failed to update faculty with id ${id}`);
    }
  }

  async remove(id: number): Promise<Faculty> {
    try {
      const faculty = await this.prisma.faculty.delete({
        where: { id },
      });

      if (!faculty) {
        throw new Error(`Faculty with id ${id} not found`);
      }

      return faculty;
    } catch (error) {
      throw new Error(`Failed to delete faculty with id ${id}`);
    }
  }
}

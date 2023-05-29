import { ClassRoutine, Prisma } from '@prisma/client';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassRoutineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ClassRoutineCreateInput): Promise<ClassRoutine> {
    try {
      return await this.prisma.classRoutine.create({ data });
    } catch (error) {
      throw new Error('Failed to create classRoutine');
    }
  }

  async findAll(): Promise<ClassRoutine[]> {
    try {
      const classRoutine = await this.prisma.classRoutine.findMany({
        orderBy: { id: 'asc' },
      });
      return classRoutine;
    } catch (error) {
      throw new Error('Failed to fetch classRoutine');
    }
  }

  async findOne(id: number): Promise<ClassRoutine[]> {
    try {
      const classRoutine = await this.prisma.classRoutine.findMany({
        where: { id },
      });

      if (!classRoutine) {
        throw new Error(`classRoutine with id ${id} not found`);
      }
      return classRoutine;
    } catch (error) {
      throw new Error(`Failed to fetch classRoutine with id ${id}`);
    }
  }

  async findByDept(id: number): Promise<ClassRoutine[]> {
    try {
      const classRoutine = await this.prisma.classRoutine.findMany({
        where: { departmentId: id },
      });

      if (!classRoutine) {
        throw new Error(`classRoutine with dept id ${id} not found`);
      }
      return classRoutine;
    } catch (error) {
      throw new Error(`Failed to fetch classRoutine with dept id ${id}`);
    }
  }

  async update(params: {
    id: number;
    data: Prisma.ClassRoutineUpdateInput;
  }): Promise<ClassRoutine> {
    const { id, data } = params;

    try {
      const classRoutine = await this.prisma.classRoutine.update({
        where: { id },
        data,
      });

      if (!classRoutine) {
        throw new Error(`classRoutine with id ${id} not found`);
      }

      return classRoutine;
    } catch (error) {
      throw new Error(`Failed to update classRoutine with id ${id}`);
    }
  }

  async delete(id: number): Promise<ClassRoutine> {
    try {
      const classRoutine = await this.prisma.classRoutine.delete({
        where: { id },
      });

      if (!classRoutine) {
        throw new Error(`classRoutine with id ${id} not found`);
      }

      return classRoutine;
    } catch (error) {
      throw new Error(`Failed to delete classRoutine with id ${id}`);
    }
  }
}

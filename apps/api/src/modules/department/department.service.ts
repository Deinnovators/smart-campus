import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllDepartments(): Promise<Department[]> {
    try {
      const departments = await this.prisma.department.findMany({
        orderBy: { id: 'asc' }, // Sort by id in ascending order
      });
      return departments;
    } catch (error) {
      throw new Error('Failed to fetch departments');
    }
  }

  async getDepartmentById(id: number): Promise<Department> {
    try {
      const department = await this.prisma.department.findUnique({
        where: { id },
      });

      if (!department) {
        throw new Error(`Department with id ${id} not found`);
      }

      return department;
    } catch (error) {
      throw new Error(`Failed to fetch department with id ${id}`);
    }
  }

  async createDepartment(
    data: Prisma.DepartmentCreateInput,
  ): Promise<Department> {
    // const { name, faculty, chairman } = data;
    // if (!name || !faculty || !chairman) {
    //   throw new Error(
    //     'Department name, faculty information, and chairman are required',
    //   );
    // }
    try {
      return await this.prisma.department.create({ data });
    } catch (error) {
      throw new Error('Failed to create department');
    }
  }

  async updateDepartment(
    id: number,
    data: Prisma.DepartmentUpdateInput,
  ): Promise<Department> {
    // const { name, faculty, chairman } = data;
    // if (!name || !faculty || !chairman) {
    //   throw new Error(
    //     'Department name, faculty information, and chairman are required',
    //   );
    // }
    try {
      const department = await this.prisma.department.update({
        where: { id },
        data,
      });

      if (!department) {
        throw new Error(`Department with id ${id} not found`);
      }

      return department;
    } catch (error) {
      throw new Error(`Failed to update department with id ${id}`);
    }
  }

  async deleteDepartment(id: number): Promise<Department> {
    try {
      const department = await this.prisma.department.delete({
        where: { id },
      });

      if (!department) {
        throw new Error(`Department with id ${id} not found`);
      }

      return department;
    } catch (error) {
      throw new Error(`Failed to delete department with id ${id}`);
    }
  }
}

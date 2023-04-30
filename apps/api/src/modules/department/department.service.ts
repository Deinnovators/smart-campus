import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllDepartments(): Promise<Department[]> {
    return this.prisma.department.findMany();
  }

  async getDepartmentById(id: number): Promise<Department> {
    return this.prisma.department.findUnique({
      where: { id },
    });
  }

  async createDepartment(
    data: Prisma.DepartmentCreateInput,
  ): Promise<Department> {
    return this.prisma.department.create({ data });
  }

  async updateDepartment(
    id: number,
    data: Prisma.DepartmentUpdateInput,
  ): Promise<Department> {
    return this.prisma.department.update({
      where: { id },
      data,
    });
  }

  async deleteDepartment(id: number): Promise<Department> {
    return this.prisma.department.delete({
      where: { id },
    });
  }
}

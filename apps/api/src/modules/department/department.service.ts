import { Injectable } from '@nestjs/common';
import { Department, Prisma } from 'database';
import { PrismaService } from '../persistance/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async findOne(args: Prisma.UserFindUniqueOrThrowArgs): Promise<Department> {
    return this.prisma.department.findUniqueOrThrow({
      where: { id: args.where.id },
    });
  }

  async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
    return this.prisma.department.create({ data });
  }

  async update(id: number, data: Prisma.DepartmentUpdateInput) {
    return this.prisma.department.update({ where: { id }, data });
  }

  async findMany(args?: Prisma.FacultyFindManyArgs): Promise<Department[]> {
    return this.prisma.department.findMany(args);
  }

  async deleteOne(id: number) {
    return this.prisma.department.delete({ where: { id } });
  }
}

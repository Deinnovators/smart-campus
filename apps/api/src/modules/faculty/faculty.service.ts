import { Injectable } from '@nestjs/common';
import { Faculty, Prisma } from 'database';
import { PrismaService } from '../persistance/prisma/prisma.service';

@Injectable()
export class FacultyService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async findOne(args: Prisma.UserFindUniqueOrThrowArgs): Promise<Faculty> {
    return this.prisma.faculty.findUniqueOrThrow({
      where: { id: args.where.id },
    });
  }

  async create(data: Prisma.FacultyCreateInput): Promise<Faculty> {
    return this.prisma.faculty.create({ data });
  }

  async update(id: number, data: Prisma.FacultyUpdateInput) {
    return this.prisma.faculty.update({ where: { id }, data });
  }

  async findMany(args?: Prisma.FacultyFindManyArgs): Promise<Faculty[]> {
    return this.prisma.faculty.findMany(args);
  }

  async deleteOne(id: number) {
    return this.prisma.faculty.delete({ where: { id } });
  }
}

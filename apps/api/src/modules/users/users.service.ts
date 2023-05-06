import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'database';

@Injectable()
export class UsersService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async findOne(args: Prisma.UserFindUniqueOrThrowArgs): Promise<User> {
    return this.prisma.user.findUniqueOrThrow(args);
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async findMany(args?: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prisma.user.findMany(args);
  }

  async deleteOne(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async deleteMany(ids: number[]) {
    return this.prisma.user.deleteMany({ where: { id: { in: ids } } });
  }
}

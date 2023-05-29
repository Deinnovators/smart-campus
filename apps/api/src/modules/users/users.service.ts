import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'database';

@Injectable()
export class UsersService {
  private include = {
    address: true,
    foreignAddress: true,
    faculty: true,
    department: true,
    chairman: true,
    dean: true,
  };
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async findOne(args: Prisma.UserFindUniqueOrThrowArgs): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      ...args,
      include: {
        ...args?.include,
        ...this.include,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
      include: this.include,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  async findMany(args?: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prisma.user.findMany({
      ...args,
      take: args.take ? +args.take : undefined,
      include: {
        ...args?.include,
        ...this.include,
      },
    });
  }

  async deleteOne(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async deleteMany(ids: number[]) {
    return this.prisma.user.deleteMany({ where: { id: { in: ids } } });
  }
}

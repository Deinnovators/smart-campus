import { PrismaService } from '@api/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User, Prisma } from 'database';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne({
    id,
    email,
    uid,
  }: {
    id?: number;
    email?: string;
    uid?: string;
  }): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id, email, uid },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async deleteOne(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async deleteMany(ids: number[]) {
    return this.prisma.user.deleteMany({ where: { id: { in: ids } } });
  }
}

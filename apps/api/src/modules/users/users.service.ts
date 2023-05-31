import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'database';
import bcrypt from 'bcrypt';

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

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

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
    data.password = await this.hashPassword(data.password);

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

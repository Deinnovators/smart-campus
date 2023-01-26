import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistance/prisma/prisma.service';
import { User } from 'database';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getHello(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}

import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSchedule() {
    return this.prisma.transportSchedule.findMany({
      include: { transport: true },
    });
  }
}

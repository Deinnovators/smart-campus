import { Injectable } from '@nestjs/common';
import { appRunningStatus } from '@api/app.constant';
import { PrismaService } from '@api/persistance/prisma/prisma.service';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return appRunningStatus;
  }
}

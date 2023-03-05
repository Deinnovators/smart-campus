import { Module } from '@nestjs/common';
import { PrismaService } from '../persistance/prisma/prisma.service';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

@Module({
  imports: [],
  providers: [DepartmentService, PrismaService],
  controllers: [DepartmentController],
  exports: [DepartmentService],
})
// eslint-disable-next-line prettier/prettier
export class DepartmentModule {}

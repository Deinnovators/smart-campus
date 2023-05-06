import { FacultyService } from '@api/modules/faculty/faculty.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../persistance/prisma/prisma.service';
import { FacultyController } from './faculty.controller';

@Module({
  imports: [],
  providers: [FacultyService, PrismaService],
  controllers: [FacultyController],
  exports: [FacultyService],
})
// eslint-disable-next-line prettier/prettier
export class FacultyModule {}

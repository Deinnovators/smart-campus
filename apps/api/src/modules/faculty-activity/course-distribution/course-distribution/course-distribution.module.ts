import { CourseDistributionService } from '@api/modules/faculty-activity/course-distribution/course-distribution/course-distribution.service';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { CourseDistributionController } from './course-distribution.controller';

@Module({
  controllers: [CourseDistributionController],
  providers: [CourseDistributionService, PrismaService],
})
export class CourseDistributionModule {}

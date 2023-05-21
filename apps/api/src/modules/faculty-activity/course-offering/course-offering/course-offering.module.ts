import { CourseOfferingController } from '@api/modules/faculty-activity/course-offering/course-offering/course-offering.controller';
import { CourseOfferingService } from '@api/modules/faculty-activity/course-offering/course-offering/course-offering.service';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CourseOfferingController],
  providers: [CourseOfferingService, PrismaService],
})
export class CourseOfferingModule {}

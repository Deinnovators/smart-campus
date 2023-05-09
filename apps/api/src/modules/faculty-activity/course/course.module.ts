import { CourseController } from '@api/modules/faculty-activity/course/course.controller';
import { CourseService } from '@api/modules/faculty-activity/course/course.service';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [CourseService, PrismaService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}

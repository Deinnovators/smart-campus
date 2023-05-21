import { Module } from '@nestjs/common';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { CourseCurriculumService } from '@api/modules/faculty-activity/curriculum/curriculum.service';
import { CurriculumController } from '@api/modules/faculty-activity/curriculum/curriculum.controller';

@Module({
  imports: [],
  providers: [CourseCurriculumService, PrismaService],
  controllers: [CurriculumController],
  exports: [],
})
export class CurriculumModule {}

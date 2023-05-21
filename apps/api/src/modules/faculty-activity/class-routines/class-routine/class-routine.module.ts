import { ClassRoutineController } from './class-routine.controller';
import { ClassRoutineService } from '@api/modules/faculty-activity/class-routines/class-routine/class-routine.service';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ClassRoutineService, PrismaService],
  controllers: [ClassRoutineController],
})
export class ClassRoutineModule {}

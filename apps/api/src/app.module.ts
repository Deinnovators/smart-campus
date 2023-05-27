import { AppController } from '@api/app.controller';
import { AppService } from '@api/app.service';
import { JwtAuthGuard } from '@api/guards/jwt-auth.guard';
import { RolesGuard } from '@api/guards/roles.guard';
import { AuthModule } from '@api/modules/auth/auth.module';
import { CourseModule } from '@api/modules/faculty-activity/course/course.module';
import { CurriculumModule } from '@api/modules/faculty-activity/curriculum/curriculum.module';
import { FacultyModule } from '@api/modules/faculty/faculty.module';
import { UsersModule } from '@api/modules/users/users.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DepartmentModule } from './modules/department/department.module';
import { ModuleRegistryModule } from './modules/module-registry/module-registry.module';
import { CourseDistributionModule } from '@api/modules/faculty-activity/course-distribution/course-distribution/course-distribution.module';
import { CourseOfferingModule } from '@api/modules/faculty-activity/course-offering/course-offering/course-offering.module';
import { ClassRoutineModule } from '@api/modules/faculty-activity/class-routines/class-routine/class-routine.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    UsersModule,
    AuthModule,
    ModuleRegistryModule,
    FacultyModule,
    DepartmentModule,
    CourseModule,
    CurriculumModule,
    CourseDistributionModule,
    CourseOfferingModule,
    ClassRoutineModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}

import { FacultyService } from '@api/modules/faculty/faculty.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [FacultyService],
  exports: [FacultyService],
})
// eslint-disable-next-line prettier/prettier
export class FacultyModule {}

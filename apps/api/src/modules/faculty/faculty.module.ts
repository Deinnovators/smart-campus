import { FacultyService } from '@api/modules/faculty/faculty.service';
import { Module } from '@nestjs/common';
import { FacultyController } from './faculty.controller';

@Module({
  imports: [],
  providers: [FacultyService],
  controllers: [FacultyController],
})
// eslint-disable-next-line prettier/prettier
export class FacultyModule {}

import { Controller, Get } from '@nestjs/common';
import { FacultyService } from './faculty.service';

@Controller('faculty')
export class FacultyController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: FacultyService) {}
  @Get()
  async getFaculties() {
    return this.service.getFaculties();
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class FacultyService {
  private readonly faculties = [];
  getFaculties() {
    return this.faculties;
  }
}

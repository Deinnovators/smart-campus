import { GlobalExceptionFilter } from '@api/exceptions/exception-filter';
import { CourseCurriculumService } from '@api/modules/faculty-activity/curriculum/curriculum.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CourseCurriculum } from 'database';

@Controller('curriculum')
@UseFilters(GlobalExceptionFilter)
export class CurriculumController {
  constructor(
    private readonly courseCurriculumService: CourseCurriculumService,
  ) {}

  @Get()
  async getAllCurriculum(): Promise<CourseCurriculum[]> {
    return this.courseCurriculumService.getAllCurriculum();
  }

  @Get(':id')
  async getCurriculumById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CourseCurriculum> {
    return this.courseCurriculumService.getCurriculumById(id);
  }

  @Post()
  async createCurriculum(
    @Body() data: CourseCurriculum,
  ): Promise<CourseCurriculum> {
    return this.courseCurriculumService.createCurriculum(data);
  }

  @Patch(':id')
  async updateCurriculum(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CourseCurriculum,
  ): Promise<CourseCurriculum> {
    return this.courseCurriculumService.updateCurriculum(id, data);
  }

  @Delete(':id')
  async deleteCurriculum(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CourseCurriculum> {
    return this.courseCurriculumService.deleteCurriculum(id);
  }
}

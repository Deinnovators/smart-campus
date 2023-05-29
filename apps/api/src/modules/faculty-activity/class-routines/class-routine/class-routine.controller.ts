import { AccessRoles } from '@api/decorators/roles.decorator';
import { GlobalExceptionFilter } from '@api/exceptions/exception-filter';
import { ClassRoutineService } from '@api/modules/faculty-activity/class-routines/class-routine/class-routine.service';
import {
  Controller,
  UseFilters,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ClassRoutine, Prisma } from '@prisma/client';

@UseFilters(GlobalExceptionFilter)
@Controller('class-routine')
export class ClassRoutineController {
  constructor(private readonly classRoutineService: ClassRoutineService) {}

  @Get()
  async findAll(): Promise<ClassRoutine[]> {
    return this.classRoutineService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClassRoutine[]> {
    return this.classRoutineService.findOne(id);
  }
  @Get('department/:id')
  async findByDept(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClassRoutine[]> {
    return this.classRoutineService.findByDept(id);
  }

  @AccessRoles('superadmin', 'admin')
  @Post()
  async create(
    @Body() data: Prisma.ClassRoutineCreateInput,
  ): Promise<ClassRoutine> {
    return this.classRoutineService.create(data);
  }

  @AccessRoles('superadmin', 'admin')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.ClassRoutineUpdateInput,
  ): Promise<ClassRoutine> {
    return this.classRoutineService.update({
      id: id,
      data,
    });
  }

  @AccessRoles('superadmin', 'admin')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ClassRoutine> {
    return this.classRoutineService.delete(+id);
  }
}

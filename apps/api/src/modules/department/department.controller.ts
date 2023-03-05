import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  // eslint-disable-next-line prettier/prettier
  Post,
} from '@nestjs/common';
import { Department, Prisma } from 'database';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: DepartmentService) {}

  @Get()
  async getDepartments() {
    return this.service.findMany();
  }

  @Get(':id')
  async getDepartment(@Param('id', ParseIntPipe) id): Promise<Department> {
    return this.service.findOne({ where: { id: id } });
  }

  @Patch(':id')
  async updateDepartment(
    @Param() params,
    @Body() data: Prisma.DepartmentCreateInput,
  ): Promise<Department> {
    return this.service.update(+params.id, data);
  }

  @Delete(':id')
  async deleteDepartment(@Param() params) {
    return this.service.deleteOne(+params.id);
  }

  @Post('/create')
  async createDepartment(
    @Body() data: Prisma.DepartmentCreateInput,
  ): Promise<Department> {
    return this.service.create(data);
  }
}

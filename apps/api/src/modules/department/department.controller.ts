import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseFilters,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department, Prisma } from '@prisma/client';
import { AccessRoles } from '@api/decorators/roles.decorator';
import { GlobalExceptionFilter } from '@api/exceptions/exception-filter';
import QueryString from 'qs';

@Controller('departments')
@UseFilters(GlobalExceptionFilter)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @AccessRoles('superadmin', 'admin')
  @Get()
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentService.getAllDepartments();
  }

  @AccessRoles('superadmin', 'admin')
  @Get(':id')
  async getDepartmentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Department> {
    return this.departmentService.getDepartmentById(id);
  }

  @AccessRoles('superadmin', 'admin')
  @Post('')
  async createDepartment(
    @Body() data: Prisma.DepartmentCreateInput,
  ): Promise<Department> {
    return this.departmentService.createDepartment(data);
  }

  @AccessRoles('superadmin', 'admin')
  @Patch(':id')
  async updateDepartment(
    @Param('id') id: string,
    @Body() data: Prisma.DepartmentUpdateInput,
  ): Promise<Department> {
    return this.departmentService.updateDepartment(Number(id), data);
  }

  @AccessRoles('superadmin', 'admin')
  @Delete(':id')
  async deleteDepartment(@Param('id') id: string): Promise<Department> {
    return this.departmentService.deleteDepartment(Number(id));
  }

  @Get('/members/:id')
  async findAllMembers(
    @Param('id', ParseIntPipe) departmentId: number,
    @Query() query: string,
  ) {
    let args;
    if (query) {
      args = QueryString.parse(query);
    }

    args.where = {
      ...args.where,
      departmentId,
    };
    return this.departmentService.findAllMembers(args);
  }
}

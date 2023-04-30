import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department, Prisma } from '@prisma/client';
import { AccessRoles } from '@api/decorators/roles.decorator';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @AccessRoles('superadmin', 'admin')
  @Get()
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentService.getAllDepartments();
  }

  @AccessRoles('superadmin', 'admin')
  @Get(':id')
  async getDepartmentById(@Param('id') id: string): Promise<Department> {
    return this.departmentService.getDepartmentById(Number(id));
  }

  @AccessRoles('superadmin', 'admin')
  @Post('create')
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
}

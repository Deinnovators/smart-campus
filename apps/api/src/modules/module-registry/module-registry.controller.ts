import { AccessRoles } from '@api/decorators/roles.decorator';
import { CurrentUserRole } from '@api/decorators/user.decorators';
import { ModuleRegistryService } from '@api/modules/module-registry/module-registry.service';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma, Roles } from 'database';

@Controller('modules')
export class ModuleRegistryController {
  constructor(private readonly service: ModuleRegistryService) {}

  @Get('/parents')
  getParentModules(@CurrentUserRole() role: Roles) {
    return this.service.getParentModules(role);
  }

  @Get('/children/:url')
  getChildModules(@Param('url') url: string, @CurrentUserRole() role: Roles) {
    return this.service.getModulesByParent(url, role);
  }

  @AccessRoles('superadmin', 'admin')
  @Get('/all')
  getAllModules() {
    return this.service.getAllModules();
  }

  @AccessRoles('superadmin', 'admin')
  @Post()
  createModule(@Body() data: Prisma.ModuleRegistryCreateInput) {
    return this.service.createModule(data);
  }

  @AccessRoles('superadmin', 'admin')
  @Patch('/:id')
  updateModule(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.ModuleRegistryUpdateInput,
  ) {
    return this.service.updateModule(id, data);
  }

  @AccessRoles('superadmin', 'admin')
  @Delete('/:id')
  deleteModule(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteModule(id);
  }

  @Get('/:id')
  async getModuleById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUserRole() role: Roles,
  ) {
    const module = await this.service.getModuleById(id);
    if (module.accessToRoles.includes(role)) {
      return module;
    }
    throw new ForbiddenException();
  }
}

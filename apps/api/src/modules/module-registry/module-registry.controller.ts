import { AccessRoles } from '@api/decorators/roles.decorator';
import { CurrentUserRole } from '@api/decorators/user.decorators';
import { ModuleRegistryService } from '@api/modules/module-registry/module-registry.service';
import { ModuleImagePipe } from '@api/pipes/module-image.pipe';
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
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma, Roles } from 'database';
import QueryString from 'qs';

@Controller('modules')
export class ModuleRegistryController {
  constructor(private readonly service: ModuleRegistryService) {}

  @Get('/parents')
  getParentModules(@CurrentUserRole() role: Roles, @Query() query: string) {
    let args;
    if (query) {
      args = QueryString.parse(query);
    }
    return this.service.getParentModules(role, args);
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
  @UseInterceptors(FileInterceptor('icon'))
  createModule(
    @Body() data: Prisma.ModuleRegistryCreateInput,
    @UploadedFile(ModuleImagePipe) icon: string,
  ) {
    data.accessToRoles = JSON.parse(data.accessToRoles as string);
    return this.service.createModule({ ...data, icon });
  }

  @AccessRoles('superadmin', 'admin')
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('icon'))
  async updateModule(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.ModuleRegistryUpdateInput,
    @UploadedFile(ModuleImagePipe) icon?: string,
  ) {
    if (icon) {
      data.icon = icon;
    }
    if (data.accessToRoles) {
      data.accessToRoles = JSON.parse(data.accessToRoles as string);
    }
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

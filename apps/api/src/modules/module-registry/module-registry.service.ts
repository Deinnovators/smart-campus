import { moduleImageDir } from '@api/modules/module-registry/module-registry.contants';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Roles } from 'database';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import path from 'path';

@Injectable()
export class ModuleRegistryService {
  constructor(private readonly prisma: PrismaService) {}

  async createModule(data: Prisma.ModuleRegistryCreateInput) {
    if (!data.parentUrl) {
      data.parentUrl = null;
    }
    return this.prisma.moduleRegistry.create({ data });
  }

  async updateModule(id: number, data: Prisma.ModuleRegistryUpdateInput) {
    const module = await this.prisma.moduleRegistry.findUniqueOrThrow({
      where: { id },
    });
    const iconPath = path.join(moduleImageDir, module.icon);
    if (data.icon && existsSync(iconPath)) {
      await unlink(iconPath);
    }
    if (!data.parentUrl) {
      data.parentUrl = null;
    }
    return this.prisma.moduleRegistry.update({ where: { id }, data });
  }

  async deleteModule(id: number) {
    const res = await this.prisma.moduleRegistry.delete({ where: { id } });
    const iconPath = path.join(moduleImageDir, res.icon);
    if (existsSync(iconPath)) {
      await unlink(iconPath);
    }
    return res;
  }

  async getParentModules(
    role: Roles,
    args: Prisma.ModuleRegistryFindManyArgs = {},
  ) {
    return this.prisma.moduleRegistry.findMany({
      ...args,
      where: {
        accessToRoles: {
          has: role,
        },
        status: 'active',
        OR: [{ parentUrl: null }, { parentUrl: 'null' }, { parentUrl: '' }],
        ...args?.where,
      },
      orderBy: {
        id: 'asc',
        ...args?.orderBy,
      },
      take: args?.take ? +args.take : undefined,
    });
  }

  async getModulesByParent(parentUrl: string, role: Roles) {
    return this.prisma.moduleRegistry.findMany({
      where: { parentUrl, accessToRoles: { has: role }, status: 'active' },
    });
  }

  async getAllModules() {
    return this.prisma.moduleRegistry.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getModuleById(id: number) {
    return this.prisma.moduleRegistry.findUniqueOrThrow({ where: { id } });
  }
}

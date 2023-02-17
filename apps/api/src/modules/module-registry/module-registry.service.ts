import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Roles } from 'database';

@Injectable()
export class ModuleRegistryService {
  constructor(private readonly prisma: PrismaService) {}

  async createModule(data: Prisma.ModuleRegistryCreateInput) {
    return this.prisma.moduleRegistry.create({ data });
  }

  async updateModule(id: number, data: Prisma.ModuleRegistryUpdateInput) {
    return this.prisma.moduleRegistry.update({ where: { id }, data });
  }

  async deleteModule(id: number) {
    return this.prisma.moduleRegistry.delete({ where: { id } });
  }

  async getParentModules(role: Roles) {
    return this.prisma.moduleRegistry.findMany({
      where: {
        accessToRoles: {
          has: role,
        },
        status: 'active',
        parentId: null,
      },
    });
  }

  async getModulesByParent(parentId: number, role: Roles) {
    return this.prisma.moduleRegistry.findMany({
      where: { parentId, accessToRoles: { has: role }, status: 'active' },
    });
  }

  async getAllModules() {
    return this.prisma.moduleRegistry.findMany();
  }

  async getModuleById(id: number) {
    return this.prisma.moduleRegistry.findUniqueOrThrow({ where: { id } });
  }
}

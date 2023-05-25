import { AxiosInstance, AxiosRequestConfig } from 'axios';
import BaseHttp from './base.http';
import { ModuleRegistry, Prisma } from 'database';
import { Endpoints } from './constants/endpoints';

export class ModulesApi extends BaseHttp {
  private readonly endpoints: Endpoints;

  constructor(readonly instance: AxiosInstance, readonly ep: Endpoints) {
    super(instance);
    this.endpoints = ep;
  }

  async getParents(
    args?: Prisma.ModuleRegistryFindManyArgs,
    config?: AxiosRequestConfig,
  ): Promise<ModuleRegistry[]> {
    const query = this.getQueryString(args);
    const res = await this.get({
      endpoint: `${this.endpoints.modules.parents}${query ? '?' + query : ''}`,
      config,
    });
    return res.data;
  }

  async getAllModules(config?: AxiosRequestConfig): Promise<ModuleRegistry[]> {
    const res = await this.get({
      endpoint: this.endpoints.modules.all,
      config,
    });
    return res.data;
  }
  async createModule(
    data: Prisma.ModuleRegistryCreateArgs,
    config?: AxiosRequestConfig,
  ): Promise<ModuleRegistry> {
    const res = await this.post({
      endpoint: this.endpoints.modules.base,
      data,
      config,
    });
    return res.data;
  }
  async deleteModule(
    id: number,
    config?: AxiosRequestConfig,
  ): Promise<ModuleRegistry> {
    const res = await this.delete({
      endpoint: this.endpoints.modules.base + '/' + id,
      config,
    });
    return res.data;
  }
}

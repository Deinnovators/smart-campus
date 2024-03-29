import { AxiosInstance, AxiosRequestConfig } from 'axios';
import BaseHttp from './base.http';
import { Department, ModuleRegistry, Prisma } from 'database';
import { Endpoints } from './constants/endpoints';

export class DepartmentApi extends BaseHttp {
  private readonly endpoints: Endpoints;

  constructor(readonly instance: AxiosInstance, readonly ep: Endpoints) {
    super(instance);
    this.endpoints = ep;
  }

  async getDepartmets(
    args?: Prisma.DepartmentFindManyArgs,
    config?: AxiosRequestConfig,
  ): Promise<Department[]> {
    const query = this.getQueryString(args);
    const res = await this.get({
      endpoint: `${this.endpoints.department.base}${query ? '?' + query : ''}`,
      config,
    });
    return res.data;
  }
}

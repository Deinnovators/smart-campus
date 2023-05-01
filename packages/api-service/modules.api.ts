import { AxiosInstance, AxiosRequestConfig } from 'axios';
import BaseHttp from './base.http';
import { ModuleRegistry } from 'database';
import { Endpoints } from './constants/endpoints';

export class ModulesApi extends BaseHttp {
  private readonly endpoints: Endpoints;

  constructor(readonly instance: AxiosInstance, readonly ep: Endpoints) {
    super(instance);
    this.endpoints = ep;
  }

  async getParents(config?: AxiosRequestConfig): Promise<ModuleRegistry[]> {
    const res = await this.get({
      endpoint: this.endpoints.modules.parents,
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
}

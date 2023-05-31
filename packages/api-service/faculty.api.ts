import { AxiosInstance, AxiosRequestConfig } from 'axios';
import BaseHttp from './base.http';
import { Faculty, Prisma } from 'database';
import { Endpoints } from './constants/endpoints';

export class FacultyApi extends BaseHttp {
  private readonly endpoints: Endpoints;

  constructor(readonly instance: AxiosInstance, readonly ep: Endpoints) {
    super(instance);
    this.endpoints = ep;
  }

  async getFaculties(
    args?: Prisma.FacultyFindManyArgs,
    config?: AxiosRequestConfig,
  ): Promise<Faculty[]> {
    const query = this.getQueryString(args);
    const res = await this.get({
      endpoint: `${this.endpoints.faculty.base}${query ? '?' + query : ''}`,
      config,
    });
    return res.data;
  }
}

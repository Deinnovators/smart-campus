import { AxiosInstance, AxiosRequestConfig } from 'axios';
import BaseHttp from './base.http';
import { Prisma, User } from 'database';
import { Endpoints } from './constants/endpoints';

export class UsersApi extends BaseHttp {
  private readonly endpoints: Endpoints;

  constructor(readonly instance: AxiosInstance, readonly ep: Endpoints) {
    super(instance);
    this.endpoints = ep;
  }

  async getUsers(
    args: Prisma.UserFindManyArgs,
    config: AxiosRequestConfig,
  ): Promise<User> {
    const query = this.getQueryString(args);
    const res = await this.get({
      endpoint: `${this.endpoints.users.base}${query ? '?' + query : ''}`,
      config,
    });
    return res.data;
  }

  async getUserById(
    id: string | number,
    config: AxiosRequestConfig,
  ): Promise<User> {
    const res = await this.get({
      endpoint: `${this.endpoints.users.base}/${id}`,
      config,
    });
    return res.data;
  }
}

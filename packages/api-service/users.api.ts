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

  async createUser(
    data: Prisma.UserCreateInput,
    config?: AxiosRequestConfig,
  ): Promise<User> {
    const res = await this.post({
      endpoint: this.endpoints.users.base,
      data,
      config,
    });
    return res.data;
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

  async deleteUser(
    id: string | number,
    config?: AxiosRequestConfig,
  ): Promise<void> {
    await this.delete({
      endpoint: `${this.endpoints.users.base}/${id}`,
      config,
    });
  }

  async updateUser(
    id: string | number,
    data: Prisma.UserUpdateInput,
    config?: AxiosRequestConfig,
  ): Promise<User> {
    const res = await this.patch({
      endpoint: `${this.endpoints.users.base}/${id}`,
      data,
      config,
    });
    return res.data;
  }
}

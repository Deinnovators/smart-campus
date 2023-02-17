import { AxiosInstance } from 'axios';
import BaseHttp from './base.http';
import { User } from 'database';
import { Endpoints } from './constants/endpoints';

export class AuthApi extends BaseHttp {
  private readonly endpoints: Endpoints;

  constructor(readonly instance: AxiosInstance, readonly ep: Endpoints) {
    super(instance);
    this.endpoints = ep;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ jwt: string; user: User }> {
    const res = await this.post({
      endpoint: this.endpoints.auth.login,
      data: { email, password },
    });
    return res.data;
  }
}

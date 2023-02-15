import { AxiosInstance } from 'axios';
import BaseHttp from './base.http';
import { User } from 'database';

export class AuthApi extends BaseHttp {
  constructor(instance: AxiosInstance) {
    super(instance);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ jwt: string; user: User }> {
    const res = await this.post({
      endpoint: '/auth/login',
      data: { email, password },
    });
    return res.data;
  }
}

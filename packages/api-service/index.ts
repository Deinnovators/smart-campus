import axios, { AxiosInstance } from 'axios';
import { AuthApi } from './auth.api';

export class ApiService {
  private instance: AxiosInstance;
  auth: AuthApi;

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:1337/api',
    });

    this.auth = new AuthApi(this.instance);
  }
}

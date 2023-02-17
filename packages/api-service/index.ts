import { AxiosInstance } from 'axios';
import { endpoints } from './constants/endpoints';
import { AuthApi } from './auth.api';
export class ApiService {
  private instance: AxiosInstance;
  auth: AuthApi;
  endpoints = endpoints;

  constructor(readonly axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
    this.auth = new AuthApi(this.instance, this.endpoints);
  }
}

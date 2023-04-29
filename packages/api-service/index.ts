import { AxiosInstance } from 'axios';
import { endpoints } from './constants/endpoints';
import { AuthApi } from './auth.api';
import { ModulesApi } from './modules.api';
export class ApiService {
  private instance: AxiosInstance;
  auth: AuthApi;
  modules: ModulesApi;
  private endpoints = endpoints;
  authHeaderKey: string = 'Authorization';
  authTokenType: string = 'Bearer';

  constructor(readonly axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
    this.auth = new AuthApi(this.instance, this.endpoints);
    this.modules = new ModulesApi(this.instance, this.endpoints);
  }
}

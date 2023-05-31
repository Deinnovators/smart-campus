import { AxiosInstance } from 'axios';
import { endpoints } from './constants/endpoints';
import { AuthApi } from './auth.api';
import { ModulesApi } from './modules.api';
import { UsersApi } from './users.api';
import { FacultyApi } from './faculty.api';
import { DepartmentApi } from './department.api';
export class ApiService {
  private instance: AxiosInstance;
  auth: AuthApi;
  modules: ModulesApi;
  private endpoints = endpoints;
  authHeaderKey: string = 'Authorization';
  authTokenType: string = 'Bearer';
  users: UsersApi;
  faculty: FacultyApi;
  department: DepartmentApi;

  constructor(readonly axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
    this.auth = new AuthApi(this.instance, this.endpoints);
    this.modules = new ModulesApi(this.instance, this.endpoints);
    this.users = new UsersApi(this.instance, this.endpoints);
    this.faculty = new FacultyApi(this.instance, this.endpoints);
    this.department = new DepartmentApi(this.instance, this.endpoints);
  }
}

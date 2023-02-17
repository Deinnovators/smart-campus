import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Request {
  endpoint: string;
  config?: AxiosRequestConfig;
}

export interface PostRequest<T> {
  endpoint: string;
  data: T;
  config?: AxiosRequestConfig;
}

abstract class BaseHttp {
  private readonly _instance: AxiosInstance;

  constructor(readonly instance: AxiosInstance) {
    this._instance = instance;
  }

  protected async get<R = any>({
    endpoint,
    config,
  }: Request): Promise<AxiosResponse<R>> {
    return this._instance.get(endpoint, config);
  }

  protected async post<T = any, R = any>({
    endpoint,
    data,
    config,
  }: PostRequest<T>): Promise<AxiosResponse<R>> {
    return this._instance.post(endpoint, data, config);
  }

  protected async delete<R = any>({
    endpoint,
    config,
  }: Request): Promise<AxiosResponse<R>> {
    return this._instance.delete(endpoint, config);
  }

  protected async put<T = any, R = any>({
    endpoint,
    data,
    config,
  }: PostRequest<T>): Promise<AxiosResponse<R>> {
    return this._instance.put(endpoint, data, config);
  }

  protected async patch<T = any, R = any>({
    endpoint,
    data,
    config,
  }: PostRequest<T>): Promise<AxiosResponse<R>> {
    return this._instance.patch(endpoint, data, config);
  }
}

export default BaseHttp;

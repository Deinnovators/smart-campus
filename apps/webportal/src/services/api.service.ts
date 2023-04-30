import { getApiUrlOfVersion } from '@webportal/constants';
import { cookieService } from '@webportal/services/cookies.service';
import { ApiService } from 'api-service';
import axios, { InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: getApiUrlOfVersion('v1'),
});

class _ApiService extends ApiService {
  constructor() {
    super(axiosInstance);
    axiosInstance.interceptors.request.use(this.handleRequest);
  }

  private handleRequest = (config: InternalAxiosRequestConfig) => {
    const token = cookieService.get('token');
    if (token) {
      config.headers[this.authHeaderKey] = `${this.authTokenType} ${token}`;
    }

    return config;
  };
}

export const api = new _ApiService();

import { AuthHeaderKey, getApiUrlOfVersion } from '@webportal/constants';
import { cookieService } from '@webportal/services/cookies.service';
import { ApiService } from 'api-service';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: getApiUrlOfVersion('v1'),
});

axiosInstance.interceptors.request.use(config => {
  const token = cookieService.get('token');
  if (token) {
    config.headers[AuthHeaderKey] = `Bearer ${token}`;
  }

  return config;
});

export const api = new ApiService(axiosInstance);

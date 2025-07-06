import { axiosInstance as axios } from '.';
import { getBearerToken } from '@/services/localStorage';

import { ErrorCode } from '@/constants';
import { refreshToken } from '@/modules/authentication/authenticationApi';

axios.interceptors.request.use(
  async (config) => {
    // Do something with request
    console.log('Request intercept');
    return config;
  },
  async (error: any) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    // console.log(response.status);
    return response;
  },
  async (error: any) => {
    const res: ResponseError = error.response.data;
    if (res?.errorCode == ErrorCode.AccessTokenExpired && !error.config._isRetry) {
      return refreshToken().then((response) => {
        if (response) {
          error.config._isRetry = true;
          const originalRequestConfig = error.config;
          originalRequestConfig.headers.Authorization = getBearerToken();
          return axios.request(originalRequestConfig);
        }
      });
    }

    return Promise.reject(error);
  }
);

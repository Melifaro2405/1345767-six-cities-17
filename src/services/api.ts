import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { getStorageUserData } from './auth-user-data.ts';

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  StatusCodeMapping[response.status];

const BackEndUrl = 'https://16.design.htmlacademy.pro/six-cities';
const RequestTimeout = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BackEndUrl,
    timeout: RequestTimeout,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { token } = getStorageUserData();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.message);
      }

      throw error;
    },
  );

  return api;
};

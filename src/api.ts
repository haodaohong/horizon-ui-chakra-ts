// api.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://ai.api.1app.site/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer WM5ABA9E202D94C43ASW3CA6600F2BF77FWM`
}
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // 对响应数据做点什么
    return response;
  },
  (error: AxiosError) => {
    // 对响应错误做点什么
    if (error.response) {
      const { status } = error.response;
      // 根据返回的status进行统一处理
      switch (status) {
        case 400:
          // 处理400错误
          break;
        case 401:
          // 处理401错误
          break;
        case 403:
          // 处理403错误
          break;
        case 404:
          // 处理404错误
          break;
        default:
          // 其他错误
      }
    } else {
      // 请求未发出或者网络错误
    }
    return Promise.reject(error);
  }
);

export default instance;
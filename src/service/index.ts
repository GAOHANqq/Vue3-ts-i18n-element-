/*
 * @Descripttion: axios封装 请求拦截、相应拦截、错误统一处理
 * @Author: liuyue
 * @Date: 2020-06-05 08:52:35
 * @LastEditors: liuyue
 * @LastEditTime: 2020-06-22 19:30:11
 */
import axios from 'axios';
import QS from 'qs';
import http from 'http'
import https from 'https'
import { ElMessage } from 'element-plus'
import { URL_TYPE } from '@/config/globalConfig'
const service = axios.create({
  // 自定义的请求头
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    'X-Requested-Width': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    token: null
  },
  // 超时设置
  timeout: 10*1000,
  // 跨域是否带token
  // withCredentials: true,
  responseType: 'json',
  httpAgent: new http.Agent({
    keepAlive: true
  }),
  httpsAgent: new https.Agent({
    keepAlive: true
  })
});
// 请求拦截器
service.interceptors.request.use(
  (config:any) => {
    if(config.method=="post"){
      config.data = QS.stringify(config.data);
    }
    // config.headers.token = UserModule.token;
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  })
// 返回状态判断
service.interceptors.response.use((res: any) => {
  let _data = null;
  if (res.code||res.data.code || res.data.code === 0 || res.data.data || res.data.data === 0) {
    switch (res.data.code) {
      case 1:
        _data = res.data.data;
        break;
      default:
        _data = Promise.reject(res.data);
        ElMessage({message: res.data.msg, type: 'error'})
        break;
    }
  } else {
    _data = res.data;
  }
  return _data;
}, (error:any) => {
  try {
    // 404等问题可以在这里处理
    switch (error.response.status) {
      case 400:
        error.message = '请求错误';
        break;

      case 401:
        error.message = '未授权，请登录';
        break;

      case 402:
        error.message = '登录过期，请重新登录';
        break;

      case 403:
        error.message = '拒绝访问';
        break;

      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`;
        break;

      case 408:
        error.message = '请求超时';
        break;

      case 500:
        error.message = '服务器内部错误';
        break;

      case 501:
        error.message = '服务未实现';
        break;

      case 502:
        error.message = '网关错误';
        break;

      case 503:
        error.message = '服务不可用';
        break;

      case 504:
        error.message = '网关超时';
        break;

      case 505:
        error.message = 'HTTP版本不受支持';
        break;
      default:
    }
  } catch (err) {
  }

  ElMessage({message: error.message, type: 'error'})
  return Promise.reject(error);
});

export const POST = (url: string, params: object,baseUrl:string = URL_TYPE.baseUrl) => {
  let _service: any = service;
  let serviceOptions: any = {
    method: 'post',
    url:baseUrl + url,
    data: params
  };
  return _service(serviceOptions);
};

export const GET = (url: string, params: object,baseUrl:string = URL_TYPE.baseUrl) => {
  let _service: any = service;
  let serviceOptions: any = {
    method: 'get',
    url:baseUrl + url,
    params
  };
  return _service(serviceOptions);
};

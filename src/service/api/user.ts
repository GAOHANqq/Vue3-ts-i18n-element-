import * as API from '../index'
// 获取
export const getUserInfo = (params: {id: number})=>{
  return API.POST('users/getUserInfo', params);
}
// 登录
export const login = (params: {username: string, password: string})=>{
  return API.POST('users/login', params);
}
// 注册
export const register = (params: {username: string, password: string})=>{
  return API.POST('users/register', params);
}
// 获取STS授权
export const getSTSToken = (params: any)=>{
  return API.POST('users/getSTSToken', params);
}



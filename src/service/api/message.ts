import * as API from '../index'
// 获取文章列表
export const getMessageList = (params: any)=>{
  return API.POST('message/getMessageList', params);
}

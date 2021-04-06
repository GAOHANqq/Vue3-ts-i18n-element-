import * as API from '../index'
// 获取文章列表
export const getCategoryList = (params: any)=>{
  return API.POST('category/getCategoryList', params);
}

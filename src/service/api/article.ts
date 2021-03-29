import * as API from '../index'
// 获取文章列表
export const getArticleList = (params: {user_id?: number, category_id?:number}={})=>{
  return API.POST('article/getArticleList', params);
}
export const getArticleListByTagId = (params: {tag_id: number})=>{
  debugger
  return API.POST('article/getArticleListByTagId', params);
}
// 编辑文章
export const editArticle = (params: {user_id: number})=>{
  return API.POST('article/editArticle', params);
}
// 获取标签列表
export const getTagsList = (params:  {user_id: number})=>{
  return API.POST('tag/tagList', params);
}
// 删除文章
export const deleteArticle = (params:any)=>{
  return API.POST('article/deleteArticle', params);
}

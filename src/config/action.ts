 /**
  * @Name: 行为枚举类
  * @Author: gaohan
  * @Date: 2021/3/17 17:57
  * @LastEditTime: 2021/3/17
  */

 export enum ACTION_TYPE{

  /*******************[begin]文章行为***************************/
  // 获取文章列表
  GET_ARTICLE_LIST = 'GET_ARTICLE_LIST',
  // 添加文章
  ADD_ARTICLE = 'ADD_ARTICLE',
  // 获取标签列表
  GET_TAGS_LIST = 'GET_TAGS_LIST',
  // 根据标签获取文章
  GET_ARTICLE_BY_TAG = 'GET_ARTICLE_BY_TAG',
  // 获取分类列表
  GET_CATEGORY_LIST = 'GET_CATEGORY_LIST',
  // 设置文章列表
  SET_ARTICLE_LIST = 'SET_ARTICLE_LIST',
  // 设置分类列表
  SET_CATEGORY_LIST = 'SET_CATEGORY_LIST',
  // 设置标签列表
  SET_TAGS_LIST = 'SET_TAGS_LIST',
  // 编辑文章
  EDIT_ARTICLE = 'EDIT_ARTICLE',
  // 编辑完成
  EDIT_ARTICLE_OK = 'EDIT_ARTICLE_OK',
  // 删除文章
  DELETE_ARTICLE = 'DELETE_ARTICLE',
  // 删除完成
  DELETE_ARTICLE_OK = 'DELETE_ARTICLE_OK',
  /*******************[end]文章行为*****************************/

  /*******************[begin]用户行为***************************/
  // 获取用户信息
  GET_USER_INFO = 'GET_USER_INFO',
  // 设置用户信息
  SET_USER_INFO = 'SET_USER_INFO',

  // 登录
  LOGIN = "LOGIN",
  // 登出
  LOGOUT = "LOGOUT",
  // 注册
  REGISTER = "REGISTER",
  // 设置语言
  SET_LANGUAGE = 'SET_LANGUAGE',
  /*******************[end]文章行为*****************************/


  /*******************[begin]权限行为***************************/
  // 设置是否登录
  SET_LOGIN = 'SET_LOGIN',
  /*******************[end]权限行为*****************************/



 /*******************[begin]留言板***************************/
 // 获取留言
 GET_MESSAGE = 'GET_MESSAGE',
 // 设置留言
 SET_MESSAGE = 'SET_MESSAGE'
 /*******************[end]留言板*****************************/
}

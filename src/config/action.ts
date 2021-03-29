 /**
  * @Name: 行为枚举类
  * @Author: gaohan
  * @Date: 2021/3/17 17:57
  * @LastEditTime: 2021/3/17
  */

 export enum ACTION_TYPE{

  /*******************[begin]文章行为*****************************/
  // 获取文章列表
  GET_ARTICLE_LIST = 'GET_ARTICLE_LIST',
  // 获取标签列表
  GET_TAGS_LIST = 'GET_TAGS_LIST',
  // 根据标签获取文章
  GET_ARTICLE_BY_TAG = 'GET_ARTICLE_BY_TAG',
  // 设置文章列表
  SET_ARTICLE_LIST = 'SET_ARTICLE_LIST',
  /** 设置标签列表 */
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

  /*******************[begin]用户行为*****************************/
  /** 获取用户信息 */
  GET_USER_INFO = 'GET_USER_INFO',
  /** 设置用户信息 */
  SET_USER_INFO = 'SET_USER_INFO',

  /** 登录 */
  LOGIN = "LOGIN",
  /** 登出 */
  LOGOUT = "LOGOUT",
  /** 注册 */
  REGISTER = "REGISTER",


  /*******************[end]文章行为*****************************/


  /*******************[begin]权限行为*****************************/
  /** 设置是否登录 */
  SET_LOGIN = 'SET_LOGIN'
  /*******************[end]权限行为*****************************/
}

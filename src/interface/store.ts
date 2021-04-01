/** store模型 */
import {IArticleModel, ITagModel} from "@/interface/home";
export interface IArticleState extends IArticleModel{
  /** 文章列表 */
  articleList: Array<IArticleModel>
  tagList: Array<ITagModel>
}
export interface IStoreModel{
  /** 权限 */
  perm: IPermModel;
  /** 用户 */
  user: IUserModel;
  /** 基础信息 */
  base: IBaseModel;
  /** 文章 */
  article: IArticleState;
  /** 留言 */
  message: IMessageStore;
}
/** 权限模型 */
export interface IPermModel{
  /** 是否登录 */
  isLogin: boolean;
}
/** 用户模型 */
export interface IUserModel{
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 用户昵称 */
  id: number;
  /** 头像 */
  avatar: string;
  /** 简介 */
  intro: string;
  /** 用户信息 */
  user: object
}
/** 基础信息模型 */
export interface IBaseModel{
  /** 当前语言 */
  lang: string
}
/** 留言模型 */
export interface IMessageModel{
  /** 留言id */
  id: number;
  /** 留言内容 */
  message: string;
  /** 创建时间 */
  created_time: string;
  /** 用户id */
  user_id: string;
  /** 用户名称 */
  user_name: string;
}
export interface IMessageStore extends IMessageModel{
  /** 留言列表 */
  messageList: Array<IMessageModel>
}

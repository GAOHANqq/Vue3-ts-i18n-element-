/** 导航模型 */
export interface INavModel{
  url: string;
  text: string;
  id: number;
}
/** 文章模型 */
export interface IArticleModel{
  /** 文章id */
  id: number;
  /** 文章标题 */
  title: string;
  /** 文章副标题 */
  sub_title: string;
  /** 文章内容 */
  body: string;
  /** 预览次数 */
  views: number;
  /** 创建时间 */
  created_time: number;
  /** 更新时间 */
  updated_time:number;
  /** 标签id */
  category_id: number;
  /** 用户id */
  user_id: number;
}
/** 留言模型 */
export interface IMessageModel{
  /** 文章id */
  id: number;
  /** 留言 */
  message: string;
  /** 留言内容 */
  body: string;
  /** 创建时间 */
  created_time: number;
  /** 更新时间 */
  updated_time:number;
  /** 文章id */
  article_Id: number;
  /** 用户id */
  user_id: number;
}
/** 标签模型 */
export interface ITagModel{
  /** 标签id */
  id: number;
  /** 标签名称 */
  name: string;
  /** 创建时间 */
  created_time: number;
  /** 用户id */
  user_id: number;
}
/** 类别模型 */
export interface ICategoryModel extends ITagModel{
  /** 文章数量 */
  article_num: number;
}


/**
 * @Name: 全局设置枚举类
 * @Author: gaohan
 * @Date: 2021/3/17 17:57
 * @LastEditTime: 2021/3/17
 */

/** 全局公用url */
export enum URL_TYPE{
  /** baseurl */
  // baseUrl = 'https://service.xjjswh.cn',
  baseUrl = 'http://localhost:3000/',
  /** 首页 */
  HOME = 'https://www.xjjswh.cn',
  /** 博客 */
  BLOG = 'https://blog.xjjswh.cn',
  /** 自我介绍 */
  RESUME = 'https://resume.xjjswh.cn'
};
/** 语言 */
export const lang:string = sessionStorage.getItem('language') || 'zh';

import {Store} from 'vuex';
import {IStoreModel} from "@/interface/store";
import {ACTION_TYPE} from '@/config/action';


/** 添加文章 */
export const  addArticle = async (store:Store<IStoreModel>,params:any)=>{
  await store.dispatch(ACTION_TYPE.ADD_ARTICLE,params)
}
/** 获取文章列表 */
export const  getArticlesList = async (store:Store<IStoreModel>,params:any)=>{
  await store.dispatch(ACTION_TYPE.GET_ARTICLE_LIST,params)
}

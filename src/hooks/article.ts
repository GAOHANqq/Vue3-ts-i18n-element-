import {Store} from 'vuex';
import {IStoreModel} from "@/interface/store";
import {ACTION_TYPE} from '@/config/action';



export const  getArticlesList = async (store:Store<IStoreModel>,params:any)=>{
  await store.dispatch(ACTION_TYPE.GET_ARTICLE_LIST,params)
}

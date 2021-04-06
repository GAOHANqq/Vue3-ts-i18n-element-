/**
 * @Name: 标签模型类
 * @Author: gaohan
 * @Date: 2021/4/6 10:03
 * @LastEditors: gaohan
 * @LastEditTime: 2021/4/6
 */
import {Module} from 'vuex';
import {IStoreModel, ITagStore} from '@/interface/store'
import {
  getTagsList,
} from '@/service/api/article'
import {AxiosResponse} from "axios";
import {ACTION_TYPE} from '@/config/action';
const state:ITagStore = {
  name: '游客',
  id: -1,
  created_time: -1,
  user_id: -1,
  tagList: []
};
const tag:Module<ITagStore,IStoreModel> = {
  state: Object.assign({},state),
  actions: {
    /** 获取标签列表 */
    [ACTION_TYPE.GET_TAGS_LIST]({commit},parmas){
      getTagsList(parmas).then((res:AxiosResponse)=>{
        commit(ACTION_TYPE.SET_TAGS_LIST,res)
      }).catch(()=>{
        commit(ACTION_TYPE.SET_TAGS_LIST,[])
      })
    }
  },
  mutations: {
    [ACTION_TYPE.SET_TAGS_LIST](state,list){
      state.tagList = list
    }
  },
  getters:{

  }
};
export default tag;

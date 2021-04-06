import {Module} from 'vuex';
import {IStoreModel,ICategoryStore} from '@/interface/store'
import {ACTION_TYPE} from '@/config/action';
import {getCategoryList} from '@/service/api/category'
const state:ICategoryStore = {
  id: -1,
  name: '游客',
  created_time: -1,
  user_id: -1,
  article_num: 0,
  categiryList: []
};
const category:Module<ICategoryStore,IStoreModel> = {
  state: Object.assign({},state),
  actions: {
    [ACTION_TYPE.GET_CATEGORY_LIST]({commit},parmas){
      getCategoryList(parmas).then((res:Array<ICategoryStore>)=>{
        commit(ACTION_TYPE.SET_CATEGORY_LIST,res)
      }).catch(()=>{
        commit(ACTION_TYPE.SET_CATEGORY_LIST,[])
      })
    }
  },
  mutations: {
    [ACTION_TYPE.SET_CATEGORY_LIST](state,categiryList){
      state.categiryList = categiryList
    }
  }
};
export default category;

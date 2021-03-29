import {Module} from 'vuex';
import {IStoreModel, IPermModel} from '@/interface/store';
import {ACTION_TYPE} from "@/config/action";
const state:IPermModel = {
  isLogin: false
};
const perm:Module<IPermModel,IStoreModel> = {
  state: Object.assign({},state),
  actions: {

  },
  mutations: {
    /** 设置是否登录 */
    [ACTION_TYPE.SET_LOGIN](state,isLogin){
      state.isLogin = isLogin;
    }
  },
  getters:{
    isLogin(state){
      return state.isLogin;
    }
  }
};
export default perm;

import {Module} from 'vuex';
import {IStoreModel, IBaseModel} from '@/interface/store';
import {lang} from '@/config/globalConfig';
import {ACTION_TYPE} from '@/config/action';
import Cookie from 'js-cookie'
const state:IBaseModel = {lang};
const base:Module<IBaseModel,IStoreModel> = {
  state: Object.assign({},state),
  actions: {

  },
  mutations: {
    [ACTION_TYPE.SET_LANGUAGE](state,lang){
      state.lang = lang
      Cookie.set('language',lang)
    }
  },
  getters:{

  }
};
export default base;

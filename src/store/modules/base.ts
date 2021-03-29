import {Module} from 'vuex';
import {IStoreModel, IBaseModel} from '@/interface/store';
import {lang} from '@/config/globalConfig';
const state:IBaseModel = {lang};
const base:Module<IBaseModel,IStoreModel> = {
  state: Object.assign({},state),
  actions: {

  },
  mutations: {

  },
  getters:{

  }
};
export default base;

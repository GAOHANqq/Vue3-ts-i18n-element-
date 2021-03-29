import {createStore} from 'vuex';
import perm from './modules/perm';
import user from './modules/user';
import base from './modules/base';
import article from './modules/article';
const store = createStore({
  modules:{
    perm,
    user,
    base,
    article
  },
  actions: {

  },
  mutations: {}
});
export default store;

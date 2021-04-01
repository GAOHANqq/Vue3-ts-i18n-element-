import {createStore} from 'vuex';
import perm from './modules/perm';
import user from './modules/user';
import base from './modules/base';
import article from './modules/article';
import message from "@/store/modules/message";
const store = createStore({
  modules:{
    perm,
    user,
    base,
    article,
    message
  },
  actions: {

  },
  mutations: {}
});
export default store;

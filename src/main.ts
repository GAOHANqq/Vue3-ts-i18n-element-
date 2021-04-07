import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import installElementPlus from '@/plugins/element-plus';
import installMdEditor from '@/plugins/md-editor';
import installI18n from '@/lang';
import './assets/styles/base.css';
import Cookie from 'js-cookie';
import {isNullOrUndefined} from "@/utils";
import {ACTION_TYPE} from "@/config/action";
// 是否登录
const user_id = Cookie.get('user_id') || '';
if( !isNullOrUndefined(user_id) && user_id != -1  ){
  store.dispatch(ACTION_TYPE.GET_USER_INFO,{id: user_id})
}

const app = createApp(App).use(router).use(store)
installElementPlus(app)
installMdEditor(app)
installI18n(app)
app.mount('#app');

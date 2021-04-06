import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import {GET} from '@/service/test'
GET({
  schoolId: '9229772032d147508d7e8df2dc86144a',
  userId: '849ca20c940d4d77ad845c54a2662444',
  firstType: 0,
  page: 1,
  limit: 10,
  hwType: -1,
  type: 1,
  subjectId:'',
  serviceVersion: '4.0'
})


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

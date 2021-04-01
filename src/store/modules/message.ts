import {Module} from 'vuex';
import {IStoreModel,IMessageStore} from '@/interface/store'
import {AxiosResponse} from "axios";
import {getMessageList} from '@/service/api/message'
import {ACTION_TYPE} from '@/config/action';
const state:IMessageStore = {
  id: -1,
  message: '',
  created_time: '',
  user_id: '',
  user_name: '',
  messageList: []
};

const message:Module<IMessageStore,IStoreModel> = {
  state: Object.assign({},state),
  actions: {
    /** 获取文章列表 */
    [ACTION_TYPE.GET_MESSAGE]({commit},parmas={}){
      getMessageList(parmas).then((res:AxiosResponse)=>{
        commit(ACTION_TYPE.SET_MESSAGE, res)
      }).catch(()=>{
        commit(ACTION_TYPE.SET_MESSAGE,[])
      })
    }
  },
  mutations: {
    [ACTION_TYPE.SET_MESSAGE](state,messageList){
      state.messageList = messageList
    }
  },
  getters:{

  }
};
export default message;

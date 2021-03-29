import {Module} from 'vuex';
import {IStoreModel, IUserModel} from '@/interface/store';
import {getUserInfo, login, register} from "@/service/api/user";
import {ACTION_TYPE} from "@/config/action";
import Cookie from "js-cookie";

const state:IUserModel = {
  username: '',
  nickname: '',
  id: -1,
  avatar: '',
  intro: '',
  user: {}
};
const user:Module<IUserModel,IStoreModel> = {
  state: Object.assign({},state),
  actions: {
    [ACTION_TYPE.GET_USER_INFO]({commit,dispatch},params){
      getUserInfo(params).then((res:IUserModel)=>{
        commit(ACTION_TYPE.SET_USER_INFO,res)
        commit(ACTION_TYPE.SET_LOGIN,true)
      }).catch(()=>{
        dispatch(ACTION_TYPE.LOGOUT)
      })
    },

    [ACTION_TYPE.LOGIN]({commit,dispatch},params){
      login(params).then((res: IUserModel)=>{
        commit(ACTION_TYPE.SET_USER_INFO,res)
        commit(ACTION_TYPE.SET_LOGIN,true)
      }).catch(()=>{
        dispatch(ACTION_TYPE.LOGOUT)
      })
    },

    [ACTION_TYPE.LOGOUT]({commit}){
      commit(ACTION_TYPE.SET_USER_INFO, state)
      commit(ACTION_TYPE.SET_LOGIN,false)
    },

    [ACTION_TYPE.REGISTER]({commit,dispatch},params){
      register(params).then((res: IUserModel)=>{
        commit(ACTION_TYPE.SET_USER_INFO,res)
        commit(ACTION_TYPE.SET_LOGIN,true)
      }).catch(()=>{
        dispatch(ACTION_TYPE.LOGOUT)
      })
    }
  },
  mutations: {
    [ACTION_TYPE.SET_USER_INFO](state,data){
      state.username = data.username
      state.nickname = data.nickname
      state.id = data.id
      state.avatar = data.avatar
      state.intro = data.intro
      state.user = data

      console.warn(state.id);
      Cookie.set('user_id', state.id)
    }
  },
  getters:{
    username(state){return state.username},
    nickname(state){return state.nickname},
    userid(state){return state.id},
    avatar(state){return state.avatar},
    intro(state){return state.intro},
    user(state){return state.user}
  }
};
export default user;

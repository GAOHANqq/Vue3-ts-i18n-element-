import {Module} from 'vuex';
import {IStoreModel, IArticleState} from '@/interface/store'
import {
  getArticleList,
  editArticle,
  deleteArticle,
  getTagsList,
  getArticleListByTagId
} from '@/service/api/article'
import {AxiosResponse} from "axios";
import {ACTION_TYPE} from '@/config/action';
const state:IArticleState = {
  id: -1,
  title: '',
  sub_title: '',
  body: '',
  views: 0,
  created_time: -1,
  updated_time:-1,
  category_id: -1,
  user_id: -1,
  articleList:[],
  tagList:[]
};
const article:Module<IArticleState,IStoreModel> = {
  state: Object.assign({},state),
  actions: {
    /** 获取文章列表 */
    [ACTION_TYPE.GET_ARTICLE_LIST]({commit},parmas){
      getArticleList(parmas).then((res:AxiosResponse)=>{
        commit(ACTION_TYPE.SET_ARTICLE_LIST,res)
      }).catch(()=>{
        commit(ACTION_TYPE.SET_ARTICLE_LIST,[])
      })
    },
    /** 根据标签获取文章列表 */
    [ACTION_TYPE.GET_ARTICLE_BY_TAG]({commit},parmas){
      getArticleListByTagId(parmas).then((res:AxiosResponse)=>{
        commit(ACTION_TYPE.SET_ARTICLE_LIST,res)
      }).catch(()=>{
        commit(ACTION_TYPE.SET_ARTICLE_LIST,[])
      })
    },
    /** 获取标签列表 */
    [ACTION_TYPE.GET_TAGS_LIST]({commit},parmas){
      getTagsList(parmas).then((res:AxiosResponse)=>{
        commit(ACTION_TYPE.SET_TAGS_LIST,res)
      }).catch(()=>{
        commit(ACTION_TYPE.SET_TAGS_LIST,[])
      })
    },
    /** 编辑文章 */
    [ACTION_TYPE.EDIT_ARTICLE]({commit,dispatch},parmas){
      editArticle(parmas).then(()=>{
        dispatch(ACTION_TYPE.GET_ARTICLE_LIST, {user_id: parmas.user_id})
      }).catch(()=>{
        dispatch(ACTION_TYPE.GET_ARTICLE_LIST, {user_id: parmas.user_id})
      })
    },
    /** 删除文章 */
    [ACTION_TYPE.DELETE_ARTICLE]({commit},parmas){
      deleteArticle(parmas).then((res:AxiosResponse)=>{
        commit(ACTION_TYPE.DELETE_ARTICLE_OK,res)
      })
    },
  },
  mutations: {
    [ACTION_TYPE.SET_ARTICLE_LIST](state,list){
      state.articleList = list
    },
    [ACTION_TYPE.SET_TAGS_LIST](state,list){
      state.tagList = list
    },
    [ACTION_TYPE.EDIT_ARTICLE_OK](state,data){
      // 编辑信息
    },
    [ACTION_TYPE.DELETE_ARTICLE_OK](state,id){
      state.articleList.delete(id)
    }
  },
  getters:{
    articleList(state){return state.articleList},
    tagList(state){return state.tagList}
  }
};
export default article;

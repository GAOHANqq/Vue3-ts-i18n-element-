<template>
  <template v-if="articleList[0]">
  </template>
  <el-row class="article-list">
    <template v-if="articleList.length">
      <el-col :span="20" :push="1" v-for="item in  articleList" :key="item.id" class="article-item">
        <el-card shadow="always">
          <h3 v-html="item.title" class="article-title" @click="openDetail(item)"></h3>
          <h5 v-html="item.sub_title" v-if="item.sub_title" class="article-subtitle"></h5>
          <p class="article-info">
            <el-tag type="info" size="mini" @click="getListByCate(item)">{{item.category_name}}</el-tag>
            浏览次数: {{item.views}}
          </p>
        </el-card>
      </el-col>
    </template>
    <empty v-else></empty>
  </el-row>

  <el-row class="tag-list">
    <el-col :span="20"  class="tag-item">
      <el-button plain @click="getArticleByTag">全部</el-button>
    </el-col>
    <el-col :span="20" v-for="item in tagList" :key="item.id" class="tag-item">
      <el-button plain @click="getArticleByTag(item)">{{item.name}}</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {defineComponent, computed, onMounted, reactive, toRefs} from 'vue'
import {useStore} from "vuex";
import {IStoreModel} from "@/interface/store";
import {useRouter} from "vue-router";
import {IArticleModel, ITagModel} from "@/interface/home";
import {ACTION_TYPE} from "@/config/action";
import Empty from '@/components/Empty.vue'
import {getArticlesList} from '@/hooks/article'
export default defineComponent({
  components:{
    Empty
  },
  setup() {
    const store = useStore<IStoreModel>();
    const router = useRouter();

    const state = reactive({
      articleList: computed(()=>{return store.state.article.articleList}),
      tagList: computed(()=>{return store.state.tag.tagList})
    })
    // 获取文章列表
    const getList = (param:any)=>{
      getArticlesList(store,param)
    }
    // 根据分类获取文章
    const getListByCate = (param:IArticleModel)=>{
      getList({category_id: param.category_id})
    }
    // 根据标签获取文章 当data为undefined时为获取全部
    const getArticleByTag = (data:ITagModel|undefined)=>{
      if( data === undefined ){
        getList({user_id:1})
      } else {
        store.dispatch(ACTION_TYPE.GET_ARTICLE_BY_TAG, {tag_id: data.id})
      }
    }
    // 获取标签列表
    const getTagList = (param:any)=>{
      store.dispatch(ACTION_TYPE.GET_TAGS_LIST,param)
    }
    // 打开文章详情
    const openDetail = (data:IArticleModel)=>{
      localStorage.setItem(`${store.getters.userid}_${data.id}_article`, JSON.stringify(data));
      router.push({name: 'detail', params: {id: data.id}});
    }

    onMounted(async () => {
      getList({user_id:1})
      getTagList({user_id:1})
    });
    return {
      ...toRefs(state),
      getListByCate,
      openDetail,
      getArticleByTag
    }
  }
})
</script>

<style lang="scss" scoped>
.article-list{
  padding: 10px 0;
  .article-item{
    margin: 10px 0;
    text-align: left;
    .article-title{
      color: #2d8cf0;
      cursor: pointer;
    }
    .article-info{
      font-size: 14px;
      color: #666;
    }
  }

}
.tag-list{
  padding: 10px 0;
  .tag-item{
    width: 100%;
  }
}
</style>

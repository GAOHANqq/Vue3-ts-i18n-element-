<template>
  <div class="article-detail-view">
    <h2 v-html="article.title"></h2>
    <h3 v-html="article.sub_title" v-if="article.sub_title"></h3>
    <p>
      <el-tag type="info" size="mini">{{article.category_name}}</el-tag>
      浏览次数: {{article.views}}
    </p>

    <el-button @click="toggleEditView(true)" v-if="isShowEditBtn">编辑</el-button>
    <section>
      <v-md-editor
        v-if="isShowEditView"
        v-model="article.body"
        default-fullscreen
        @save="saveEditResult"
      ></v-md-editor>
      <v-md-preview :text="article.body" v-else></v-md-preview>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent, toRefs, reactive, onMounted, ref, onBeforeUnmount} from 'vue'
import {useStore} from "vuex";
import {IStoreModel} from "@/interface/store";
import {useRoute} from "vue-router";
import {ACTION_TYPE} from "@/config/action";
export default defineComponent({
  setup() {
    const store = useStore<IStoreModel>();
    const route = useRoute();
    const state = reactive({
      // 缓存id
      cacheId: `${store.getters.userid}_${route.params.id}_article`,
      // 文章详情
      article: store.state.article,
      // 是否展示编辑弹窗
      isShowEditView: ref(false),
      // 是否展示编辑按钮
      isShowEditBtn: ref(false)
    })

    // 获取文章详情
    const getArticleDetail = ()=>{
      let article = localStorage.getItem(state.cacheId)|| '{}';
      state.article = JSON.parse(article);
      state.isShowEditBtn = state.article.user_id === store.getters.userid;
    }

    // 编辑视图切换
    const toggleEditView = (isShow: boolean)=>{
      state.isShowEditView = isShow
    }

    // 保存编辑结果
    const saveEditResult = (text:string, html:string)=>{
      store.dispatch(ACTION_TYPE.EDIT_ARTICLE,{body: text,user_id:state.article.user_id, id: state.article.id})
      toggleEditView(false)
    }

    onMounted(()=>{
      getArticleDetail()
    })
    onBeforeUnmount(()=>{
      localStorage.removeItem(state.cacheId);
    })
    return {
      ...toRefs(state),
      toggleEditView,
      saveEditResult
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

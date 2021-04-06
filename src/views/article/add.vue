<template>
  <div class="add-article-view">
    添加文章

    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="addArticleRef"
      label-width="100px"
    >
      <el-form-item label="文章标题" prop="nickname">
        <el-input type="text" v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="intro">
        <el-input type="password" v-model="form.subtitle" autocomplete="off"></el-input>
      </el-form-item>

      <!--分类-->
      <el-form-item label="文章分类" prop="category">
        <el-select v-model="curCategoryName" placeholder="请选择">
          <el-option
            v-for="item in categorylist"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          >
            {{item.name}}
          </el-option>
        </el-select>
      </el-form-item>

      <!--标签-->
      <el-form-item label="文章标签" prop="tag">
        <el-checkbox-group v-model="checkedTagList">
          <el-checkbox :label="item.name" v-for="item in tagList" :key="item.id"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="文章内容" prop="article">
        <v-md-editor
          v-model="article"
          left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
          width="100%"
          height="300px"
        ></v-md-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="checkForm">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
import {defineComponent, computed, reactive, ref, toRefs, onMounted, inject} from 'vue'
import {useStore} from "vuex";
import {IStoreModel} from "@/interface/store";
import {validateTitle} from "@/utils/validate";
import {getTagsList} from "@/hooks/tag";
import {addArticle} from "@/hooks/article";
import {getCategoryList} from "@/hooks/category";
import {isNullOrUndefined} from "@/utils";

export default defineComponent({
  setup() {
    const $message:any = inject('$message')
    const store = useStore<IStoreModel>()
    const addArticleRef = ref<any>(null)
    const state = reactive({
      checkedTagList: [],
      tagList: computed(()=>{return store.state.tag.tagList}),
      categorylist: computed(()=>{return store.state.category.categoryList}),
      curCategoryName: '',
      article: '',
      form: {
        title: '',
        subtitle: ''
      },
      rules:{
        title:[{ validator: validateTitle, trigger: 'blur' }]
      }
    })

    // 获取标签,分类
    const getList = async (params:{user_id: number})=>{
      await getTagsList(store,params)
      await getCategoryList(store,params)
      state.curCategoryName = state.categorylist ? state.categorylist[0].name : ''
    }

    const checkForm = ()=>{
      addArticleRef.value.validate((valid: boolean)=>{
        if( valid ){
          checkForm()
        }else{
          $message({message: '请输入标题', type: 'warning'})
        }
      })
      if( isNullOrUndefined(state.curCategoryName) ){
        $message({message: '请选择分类', type: 'warning'})
        return
      }
      if( state.checkedTagList.length===0 ){
        $message({message: '请选择标签', type: 'warning'})
        return
      }
      if( isNullOrUndefined(state.article) ){
        $message({message: '请输入文章内容', type: 'warning'})
        return
      }
      saveResult()
    }

    // 保存提交结果
    const saveResult = ()=>{
      addArticle(store,{

      })
    }

    onMounted(()=>{
      getList({user_id:1})
    })

    return {
      ...toRefs(state),
      addArticleRef,
      checkForm
    }
  }
})
</script>

<style lang="scss" scoped>
  .add-article-view{
    width: 100%;
    overflow-y: auto;
    .el-form-item{
      text-align: left;
    }
  }
</style>

<template>
  <el-row class="admin-main">
    <!--导航-->
    <el-col :span="4">
      <el-menu
        :default-active="curNav"
        @select="switchNav"
      >
        <el-menu-item :index="item.id" v-for="item in navList" :key="item.id">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>

    <!--右侧区域-->
    <el-col :span="20">
      <router-view v-if="isShowAddView"></router-view>
      <el-main v-else>
        <!--头部-->
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="12">
            <h3>{{navList[curNav-1].name}}</h3>
          </el-col>
          <el-col :span="12" v-if="curNav<='3'">
            <el-button size="small" v-if="curNav==='1'">
              添加分类
            </el-button>
            <el-button size="small" v-else-if="curNav==='2'">
              添加标签
            </el-button>
            <el-button size="small" v-else @click="addArticle">
              添加文章
            </el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <!--分类-->
        <el-table
          v-if="curNav==='1'"
          :data="navList[0].data"
          style="width: 100%"
          :cell-style="{textAlign: 'center'}"
          :header-cell-style="{textAlign: 'center'}"
        >
          <el-table-column
            prop="name"
            label="分类名称"
            >
          </el-table-column>
          <el-table-column
            prop="article_num"
            label="文章数量"
            >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <el-button-group>
              <el-button size="small" @click="editFn('1')">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteFn('1')">删除</el-button>
            </el-button-group>
          </el-table-column>
        </el-table>
        <!--标签-->
        <el-table
          v-else-if="curNav==='2'"
          :data="navList[1].data"
          style="width: 100%"
          :cell-style="{textAlign: 'center'}"
          :header-cell-style="{textAlign: 'center'}"
        >
          <el-table-column
            prop="name"
            label="标签名称"
           >
          </el-table-column>
          <el-table-column
            prop="created_time"
            label="创建时间"
           >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <el-button-group>
              <el-button size="small" @click="editFn('2')">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteFn('2')">删除</el-button>
            </el-button-group>
          </el-table-column>
        </el-table>
        <!--文章-->
        <el-table
          v-else-if="curNav==='3'"
          :data="navList[2].data"
          style="width: 100%"
          :cell-style="{textAlign: 'center'}"
          :header-cell-style="{textAlign: 'center'}"
        >
          <el-table-column
            prop="title"
            label="文章名称"
           >
          </el-table-column>
          <el-table-column
            prop="created_time"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            label="操作"
           >
            <el-button-group>
              <el-button size="small" @click="editFn('3')">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteFn('3')">删除</el-button>
            </el-button-group>
          </el-table-column>
        </el-table>
        <!--个人信息-->
        <el-row type="flex" align="middle" v-else>
          <el-col :span="12">
            <el-form
              :model="form"
              status-icon
              :rules="rules"
              ref="userFormRef"
              label-width="100px"
            >
              <el-form-item label="昵称" prop="nickname">
                <el-input type="text" v-model="form.nickname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="个人简介" prop="intro">
                <el-input type="password" v-model="form.intro" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
              </el-form-item>
            </el-form>
          </el-col>

          <el-col :span="12">
            <el-avatar shape="square" :src="avatar"></el-avatar>
            <el-upload
              class="upload-demo"
              :multiple="false"
              ref="upload"
              accept="image/jpeg,image/gif,image/png"
              :before-upload="beforeUpload"
            >
              <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
              <p class="el-upload__tip" slot="tip">支持jpg,jepg,png,gif类型的文件</p>
            </el-upload>
          </el-col>
        </el-row>
      </el-main>
    </el-col>

  </el-row>
</template>

<script lang="ts">
import {defineComponent, computed, reactive, toRefs, onMounted, ref} from 'vue'
import {useStore} from "vuex";
import {IStoreModel} from "@/interface/store";
import {getArticlesList} from '@/hooks/article'
import {getCategoryList} from '@/hooks/category'
import {getTagsList} from '@/hooks/tag'
import {validateUserName} from "@/utils/validate";
import {ACTION_TYPE} from "@/config/action";
import {useRoute, useRouter} from "vue-router";
import OSSUpload from "@/plugins/upload/ossUpload";
export default defineComponent({
  components: {},
  setup(props, ctx) {
    const store = useStore<IStoreModel>()
    const state = reactive({
      // 导航列表
      navList: [
        {
          id: '1',
          name: '分类管理',
          data: computed(()=>{return store.state.category.categoryList}),
          icon: 'el-icon-s-flag'
        },
        {
          id: '2',
          name: '标签管理',
          data: computed(()=>{return store.state.tag.tagList}),
          icon: 'el-icon-collection-tag'
        },
        {
          id: '3',
          name: '文章管理',
          data: computed(()=>{return store.state.article.articleList}),
          icon: 'el-icon-document'
        },
        {
          id: '4',
          name: '个人信息',
          data: computed(()=>{return store.state.user}),
          icon: 'el-icon-s-custom'
        },
      ],
      // 当前导航
      curNav: '1',
      // 表单信息
      form: {
        nickname: store.state.user.nickname || '',
        intro: store.state.user.intro || ''
      },
      // 校验规则
      rules: {
        nickname: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        intro: [
          { validator: validateUserName, trigger: 'blur' }
        ]
      },
      // 用户头像
      avatar: computed(()=>{return store.state.user.avatar}),
      isShowAddView: ref(false)
    })
    const userFormRef = ref<any>(null)
    const router = useRouter()
    const route = useRoute()
    const switchNav = (index:number,path:any)=>{
      state.curNav = path[0]
      if( state.isShowAddView ){
        router.back()
        state.isShowAddView = false
      }
    }

    // 获取列表
    const  getList = (params:{user_id:1})=>{
      getArticlesList(store,params)
      getCategoryList(store,params)
      getTagsList(store,params)
    }
    // 保存信息
    const saveUserInfo = ()=>{
      userFormRef.value.validate((valid:boolean)=>{
        if( valid ){
          // store.dispatch('ACTION_TYPE.SAVE',state.form).then(()=>{
          //
          // })
        }
      })
    };
    // 上传头像前文件校验
    const beforeUpload = (file: File)=>{
      let path:string = `blogimg/${new Date().toLocaleDateString()}/${file.name}`;

      OSSUpload.uploadFile(file,path,(res:any)=>{
        debugger
      })
    };

    const upladoFile = ()=>{
      OSSUpload.getSTSToken('blog')
    }

    // 添加文章
    const addArticle = ()=>{
      state.isShowAddView = true
      router.push({name:'add'})

    };

    // 编辑
    const editFn = (type:string)=>{
      switch(type){
        case "1":
          break;
        case "2":
          break;
        case "3":
          break;
        case "4":
          break;
        default:
          break;
      }
    }
    // 删除
    const deleteFn = (type:string)=>{
      switch(type){
        case "1":
          break;
        case "2":
          break;
        case "3":
          break;
        case "4":
          break;
        default:
          break;
      }
    }

    onMounted(()=>{
      getList({user_id:1})
      OSSUpload.getSTSToken('blog')
    })


    return {
      ...toRefs(state),
      userFormRef,
      switchNav,
      beforeUpload,
      addArticle,
      saveUserInfo,
      editFn,
      deleteFn
    }
  }
})
</script>

<style lang="scss" scoped>
.admin-main{
  height: 100%;
  overflow-y: auto;
}
</style>

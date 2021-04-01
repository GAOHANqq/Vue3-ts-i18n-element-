<template>
  <div class="home-header">
    <!--导航栏-->
    <ul class="nav-menu">
      <li v-for="item in linkList" :key="item.id">
        <a class="nav" @click="switchPage(item)">{{item.text}}</a>
      </li>
      <el-dropdown split-button type="primary" size="small" @command="toggleLanguage">
        {{$t('header.changeLanguage')}}
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in availableLocales"
              :key="item"
              :command="item">{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </ul>

    <!--登录,注册-->
    <el-row  class="login-view" type="flex" align="middle" justify="center" v-if="isLogin">
      <el-col :span="12">
<!--        <el-avatar icon="el-icon-user-solid"></el-avatar>-->
        <h3>{{userInfo.nickname}}</h3>
        <p v-if="userInfo.intro">{{userInfo.intro}}</p>
      </el-col>
      <el-col :span="12">
        <el-button plain type="primary" size="size" @click="loginOut">退出登录</el-button>
      </el-col>
    </el-row>
    <el-row  class="login-view" type="flex" align="middle" justify="center" v-else>
      <el-col :span="12">
        <el-button plain type="primary" @click="toggleloginView(true)">登录</el-button>
      </el-col>
      <el-col  :span="12">
        <el-button plain type="primary" @click="goToRegister">注册</el-button>
      </el-col>
    </el-row>


    <!--登录弹窗-->
    <login
      :isShow="isShowLoginView"
      @close-login="toggleloginView(false)"
    ></login>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, toRefs, inject, onMounted, getCurrentInstance} from "vue";
import login from '@/components/login/index.vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {IStoreModel} from '@/interface/store'
import {INavModel} from '@/interface/home'
import {ACTION_TYPE} from '@/config/action';
import {header} from '@/lang/local/header'
import {mergeLanguage,availableLocales} from '@/lang'
export default defineComponent({
  components:{
    login
  },
  setup(Proxy, context) {
    const store = useStore<IStoreModel>();
    const router = useRouter();
    const $messageBox:any = inject('$messageBox');

    // 页面数据
    const state = reactive({
      isLogin: computed(()=>{return store.getters.isLogin}),
      userInfo : computed(()=>{return store.getters.user}),
      isShowLoginView: ref(false),
      linkList: [
        {url: 'https://www.xjjswh.cn', text: '首页', id:1},
        {url: 'https://blog.xjjswh.cn', text: '博客', id: 2},
        {url: 'https://www.xjjswh.cn', text: '留言板', id: 3},
        {url: 'https://www.xjjswh.cn', text: '微信', id: 4},
        {url: 'https://github.com/GAOHANqq', text: 'github', id: 5}
      ],
      availableLocales
    });

    // 页面切换
    const switchPage = (item:INavModel)=>{
      context.emit('page-change', item.url)
    };
    // 登录弹窗切换
    const toggleloginView = (isShow:boolean)=>{
      state.isShowLoginView = isShow
    };
    // 语言切换
    const toggleLanguage = (lang:string)=>{
      store.commit(ACTION_TYPE.SET_LANGUAGE,lang);
      router.go(0);
    };
    // 登出
    const loginOut = ()=>{
      $messageBox.confirm('确定退出登录吗',{
        type: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      }).then(()=>{
        store.dispatch('LOGOUT')
      })
    };
    // 注册
    const goToRegister = ()=>{
      router.push({name: 'register'});
    };

    mergeLanguage(header)

    return {
      ...toRefs(state),
      switchPage,
      toggleloginView,
      goToRegister,
      loginOut,
      toggleLanguage
    };
  }
});
</script>

<style lang="scss" scoped>
.home-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  line-height: 1.5;
  background-color: #669199;
  padding: 0 vw(340);
  color: #fff;
  z-index: 999;

  .nav-menu{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    li{
      height: 80%;
      width: 100px;
      border: 1px solid #fff;
      border-radius: 12px;
      margin: 0 20px;
      cursor: pointer;
      a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #fff;
        &:hover{
          color: cornflowerblue;
        }
      }
    }
  }

  .login-view{
    position: fixed;
    top: 10px;
    right: 60px;
    width: 200px;
  }
}
</style>

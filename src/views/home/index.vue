<template>
  <home-header @page-change="pageChange"></home-header>
  <div class="page-main">
    <router-view></router-view>
    <!--案例展示iframe-->
    <div class="main-right-view"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <iframe
        v-if="url!==''"
        id="iframe"
        :src="url"
        frameborder="1"
        width="100%"
        height="100%"
        @load="loaded"
      ></iframe>
    </div>
  </div>
  <home-footer></home-footer>
</template>

<script lang="ts">
import { defineComponent,reactive,onMounted ,ref, toRefs} from 'vue'
import HomeHeader from '@/components/HomeHeader.vue'
import HomeFooter from '@/components/HomeFooter.vue'
import {URL_TYPE} from "@/config/globalConfig";
import {useRouter} from 'vue-router'
export default defineComponent({
  components: {
    HomeHeader, HomeFooter
  },
  setup() {
    const router = useRouter();
    const state = reactive({url: ''});
    // 是否正在加载
    const loading = ref<boolean>(true);
    // 页面改变
    const pageChange = (url:string) => {
      state.url = url
    }
    //  url加载完成
    const loaded = () => {
      loading.value = false
    }

    onMounted(async () => {
      router.push({name: 'list'});
      pageChange(URL_TYPE.BLOG);
    });
    return {
      ...toRefs(state),
      loading,
      pageChange,
      loaded
    }
  }
})
</script>

<style lang="scss" scoped>
.page-main{
  height: calc(100% - 120px);
  overflow: auto;

  display: flex;


  .main-right-view{
    //float: right;
    width: 600px;
    margin: 20px 20px 0 0;
    height: calc(100% - 40px);
  }
}
</style>

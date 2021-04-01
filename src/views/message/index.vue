<template>
  <div class="message-view">
    <h2>留言板</h2>
    <el-row>
      <el-row
        type="flex"
        align="middle"
        justify="flex-start"
        class="message-item"
        v-for="item in messageList"
        :key="item.id"
      >

        <!--头像-->
        <el-avatar :size="25">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
        <!--用户名称-->
        <el-tag type="info" size="mini">{{item.user_name}}:</el-tag>
        <!--留言-->
        <p v-html="item.message" ></p>
      </el-row>
    </el-row>

  </div>
</template>

<script lang="ts">
import {defineComponent, computed, reactive, toRefs, onMounted} from 'vue'
import {useStore} from "vuex";
import {IStoreModel} from "@/interface/store";
import {ACTION_TYPE} from "@/config/action";
export default defineComponent({
  components: {},
  setup() {
    const store = useStore<IStoreModel>()


    const state = reactive({
      messageList: computed(()=>{return store.state.message.messageList})
    })

    // 获取留言列表
    const getLsit = ()=>{
      store.dispatch(ACTION_TYPE.GET_MESSAGE)
    }

    onMounted(()=>{
      getLsit()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.message-item{
  width: 100%;
  margin: 5px 10px;
}
</style>

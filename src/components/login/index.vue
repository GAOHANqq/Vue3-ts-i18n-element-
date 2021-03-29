<template>
  <el-dialog
    :model-value="isShow"
    :model="isShowModal"
    width="25%"
    @close="close"
  >
    <el-form
      :model="formItem"
      :rules="rules"
      status-icon
      ref="ruleFormRef"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="formItem.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formItem.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, inject} from 'vue'
import {validateUserName, validatePassWord} from "@/utils/validate";
import {useStore} from "vuex";
import {IUserModel} from "@/interface/store";
import {ACTION_TYPE} from "@/config/action";
export default defineComponent({
  props: {
    // 是否展示弹窗
    isShow: {
      type: Boolean,
      default: false
    },
    // 是否展示遮罩
    isShowModal: {
      type: Boolean,
      default: true
    },
    // 标题
    title: {
      type: String,
      default: '登录'
    }
  },
  emits:['close-login'],
  setup(props,ctx) {
    // 表单数据

    const store = useStore<IUserModel>();
    const ruleFormRef = ref<any>(null);
    const $message:any = inject('$message');

    const state = reactive({
      formItem:{
        username: '',
        password: ''
      },

      rules: {
        username: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassWord, trigger: 'blur' }
        ]
      }
    });

    // 提交
    const submitForm = ()=>{
      ruleFormRef.value.validate((valid:boolean)=>{
        if( valid ){
          store.dispatch(ACTION_TYPE.LOGIN,state.formItem).then(()=>{
            close()
          })
        }else{
          $message({message: '用户名或密码错误！', type:"warning"})
        }
      })

    };

    // 重置
    const resetForm = ()=>{
      ruleFormRef.value.resetFields()
    };

    // 关闭
    const close = ()=>{
      ctx.emit('close-login')
    }

    return {
      ...toRefs(state),
      ruleFormRef,
      submitForm,
      resetForm,
      close
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

<template>
  <el-card class="register-view" shadow="always">
    <el-form ref="ruleFormRef"
             :model="formItem"
             :rules="rules"
             label-width="80px">
      <!--      <el-form-item label="手机号码"-->
      <!--                    prop="mobile">-->
      <!--        <el-input v-model="formItem.mobile"-->
      <!--                  placeholder="请输入手机号码"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="验证码"-->
      <!--                    prop="validateCode">-->
      <!--        <el-input v-model="formItem.validateCode"-->
      <!--                  @on-blur="checkValidateCode"-->
      <!--                  placeholder="请输入验证码">-->
      <!--          <template #suffix>-->
      <!--            <el-button type="primary"-->
      <!--                       @click="showCaptcha"-->
      <!--                       round>-->
      <!--              {{reSendTime==120||reSendTime==0?'获取验证码':'重新获取（'+reSendTime+'）'}}-->
      <!--            </el-button>-->
      <!--          </template>-->
      <!--        </el-input>-->
      <!--      </el-form-item>-->

      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="formItem.username"
                  placeholder="请用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="formItem.password"
                  show-password
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="rePassword">
        <el-input v-model="formItem.rePassword"
                  show-password
                  placeholder="再次输入密码"></el-input>
      </el-form-item>
      <div class="submit-btn-view">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="register">注册</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, inject} from 'vue'
import {validateUserName, validatePassWord} from "@/utils/validate";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {IUserModel} from "@/interface/store";
import {ACTION_TYPE} from "@/config/action";
export default defineComponent({
  setup() {
    const store = useStore<IUserModel>();
    const router = useRouter();
    const $message:any = inject('$message');
    const state = reactive({
      formItem: {
        username: '',
        password: '',
        rePassword: ''
      },
      rules: {
        username: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassWord, trigger: 'blur' }
        ],
        rePassword: [
          { validator: validatePassWord, trigger: 'blur' }
        ]
      }
    })
    const ruleFormRef = ref<any>(null)
    // 重置
    const resetForm = ()=>{
      ruleFormRef.value.resetFields()
    };
    // 注册
    const register = ()=>{
      ruleFormRef.value.validate((valid:boolean)=>{
        if(valid){
          store.dispatch(ACTION_TYPE.LOGIN,{username:state.formItem.username,password:state.formItem.username})
          $message({message: '恭喜您注册成功,即将跳转到首页', type: 'success'});
          setTimeout(()=>{
            router.back()
          }, 1000)
        }else{
          $message({message: '用户名或密码错误', type: 'warning'});
        }
      });
    };
    return {
      ...toRefs(state),
      ruleFormRef,
      resetForm,
      register
    }
  }
})
</script>

<style lang="scss" scoped>
.register-view{
  width: 20%;
  margin: 0 auto;
  .submit-btn-view{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>

<template>
  <el-space direction="vertical" alignment="flex-start">
    <div class="about-me">
      个人中心
    </div>
  </el-space>
</template>

<script lang="ts">
import {defineComponent, computed, reactive, toRefs} from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      loading: true
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class='home-footer'>
    <a :href="footData.link">{{footData.name}}</a>
    <a :href="footData.github">github</a>
    <span>copyRight by {{ footData.author }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
   const footData = {
     name: '九思文化',
     link: 'www.xjjswh.com',
     author: 'gaohan',
     github: 'https://github.com/GAOHANqq'
   }

   return {
     footData
    }
  }
});
</script>

<style lang="scss" scoped>
.home-footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  background-color: #669199;
  font-size: 14px;
  a{
    margin: 0 10px;
    color: #fff;
  }
}
</style>

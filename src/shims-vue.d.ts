/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'http'
declare module 'https'
declare module 'element-ui/*'
declare module '@kangc/*'
declare module 'js-md5'
declare module 'js-cookie'
declare module 'js-base64'

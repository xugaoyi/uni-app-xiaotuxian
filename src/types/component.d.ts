// /**
//  * declare module '@vue/runtime-core'
//  *   现调整为
//  * declare module 'vue'
//  */
// import 'vue'
// declare module 'vue' {
//   export interface GlobalComponents {
//     //
//   }
// }

import XtxSwiper from '@/components/XtxSwiper.vue'

// 定于全局组件的类型声明（基于 Volar 插件：https://github.com/vuejs/language-tools）
// 使组件在使用的地方鼠标移上去有类型提示
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
  }
}

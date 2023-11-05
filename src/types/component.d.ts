import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'

// 定于全局组件的类型声明（基于 Volar 插件：https://github.com/vuejs/language-tools）
// 使组件在使用的地方鼠标移上去有类型提示
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

// 组件实例类型 (InstanceType 获取实例类型)
export type XtxGuessInstance = InstanceType<typeof XtxGuess>

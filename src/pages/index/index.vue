<script setup lang="ts">
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
})

// 获取“猜你喜欢”组件实例
const guessRef = ref<XtxGuessInstance>()

// 滚动触底
const onScrolltolower = () => {
  guessRef.value?.getMore()
}

// 当前下拉刷新状态
const isTriggered = ref(false)

// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 重置“猜你喜欢”的数据
  guessRef.value?.resetData()
  // 加载数据
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 注意：scroll-view需要设置 flex:1，让其高度自动撑开 -->
  <scroll-view
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <!-- 轮播图 -->
    <XtxSwiper :list="bannerList" />
    <!-- 分类面板 -->
    <CategoryPanel :list="categoryList" />
    <!-- 热门推荐 -->
    <HotPanel :list="hotList" />
    <!-- 猜你喜欢 -->
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
// page 同web端的 body
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>

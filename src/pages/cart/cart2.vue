<!-- 作为普通页(非tabBar页)使用 -->
<script setup lang="ts">
import CartMain from './components/CartMain.vue'
</script>

<template>
  <CartMain safeAreaInsetBottom />
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>

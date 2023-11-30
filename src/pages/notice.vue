<template lang="pug">
div.content {{content}}
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {AppNoticeCacheKey} from "@/common/const"
import {onLoad} from "@dcloudio/uni-app"

const content = ref([])

onLoad((query: ptAny) => {
  if (query?.message && query?.message != ''){
    content.value = query?.message
  }else if (uni.getStorageSync(AppNoticeCacheKey)) {
    content.value = uni.getStorageSync(AppNoticeCacheKey).message
  }
})
</script>

<style scoped lang="scss">
.content{
  font-size: 34rpx;
  color: red;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 30rpx;
  text-align: center;
}
</style>

<template lang="pug">
div.container
  Search(ref="searchCps" :columns="columns" :options="options")
    template(v-slot="{result}")
      div.user-list
        div.item(v-for="item in result" wx:key="id")
          div.left
            div.user
              image.head(:src="item.head_img" mode="aspectFill")
            div.info
              span.nick_name {{item.nick_name}}
              span.mobile {{item.mobile}}
              span.register_time {{item.created_at ? item.created_at : ''}}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Search from "@/components/search.vue"
import userApi from "@/api/user/user"

import {onReachBottom} from "@dcloudio/uni-app"

const searchCps = ref()

const options = ref({
  api: userApi.getUserList
})

const columns = ref([
  {
    index: "register_time",
    title: "注册时间",
    value: [],
    formType: "time",
  },
  {
    index:"vip",
    title: "vip等级",
    value: -1,
    formType: "select",
    data: [
      {
        value: -1,
        text: "全部"
      }, {
        value: 0,
        text: "免费"
      }, {
        value: 10,
        text: "VIP"
      }, {
        value: 20,
        text: "SVIP"
      },
    ]
  },
])

onReachBottom(() => {
  searchCps.value.loadMore()
})
</script>

<style lang="scss" scoped>
.user-list{
  display: flex;
  flex-direction: column;
  padding-top: 25rpx;
  background-color: #f7f7f7;
  .item{
    display: flex;
    flex-direction: row;
    padding: 15rpx 30rpx;
    margin: 5rpx 0;
    background-color: $uni-text-color-inverse;
    justify-content: space-between;
    .left{
      display: flex;
      flex-direction: row;
    }
  }
  .copy_mobile{
    padding: 4rpx 5rpx;
    border-radius: 10rpx;
    background-color: $theme-color;
    color: $uni-text-color-inverse;
    font-size: 23rpx;
    border: 1rpx solid $theme-color;
  }
  .user,.info,.actions{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .info{
    margin: 0 15rpx;
    display: flex;
    flex-direction: column;
    align-items:  flex-start;
    .nick_name{
      font-size: 30rpx;
      width: 250rpx;
      overflow-y: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .register_time, .mobile{
      font-size: 26rpx;
    }
  }
  .user{
    width: 100rpx;
    position: relative;
    align-items: baseline;
    .head{
      width: 90rpx;
      height: 90rpx;
      box-shadow: 0 0 .12 rgba(249, 71, 71, .1);
      border-radius: 50%;
      background: #c1c1c1;
    }

    .vip {
      position: absolute;
      font-size: 22rpx;
      background: $theme-color;
      border-radius: 10rpx;
      /* height: 40rpx; */
      padding: 0 5rpx;
      bottom: 0;
      right: 0;
      color: $uni-text-color-inverse;
      //width: 40rpx;
      text-align: center;
      width: max-content;
    }
  }
}
</style>

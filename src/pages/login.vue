<template lang="pug">
div.login
  div.header
    image.img(src="https://img2.woyaogexing.com/2023/11/15/5c06fe714e896bfe937ceaaf1b140f4b.jpg")
  div.content
    div.tip 账号
    input.input(:value="loginData.user_name" @input="(res)=>{loginData.user_name = res.detail.value}" type="text" placeholder="请输入账号" placeholder-class="placeholder")
    div.tip 密码
    input.input(:value="loginData.password" @input="(res)=>{loginData.password = res.detail.value}" type="password" placeholder="请输入密码" placeholder-class="placeholder")
    button.submit(type="button" @click="loginHandle") 登录
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue"
import loginApi from "@/api/login"
import {LoginCacheKey, xTokenCacheKey} from "@/common/const"
import {useIndexStore} from '@/store'

const loginData = ref({
  user_name: '',
  password: '',
})

const route: ptAny = ref('/pages/index/index')

const store = useIndexStore()

onMounted(() => {
  // @ts-ignore
  let pages = getCurrentPages()
  if (pages.length) {
    let tmp = pages[pages.length - 1].route
    // @ts-ignore
    if (/^pages/.test(tmp) && '/' + tmp != "/pages/login") {
      route.value = '/' + tmp
    }
  }

  let cache = uni.getStorageSync(LoginCacheKey)
  if (cache) {
    loginData.value = cache
  }
})

const loginHandle = () => {
  if (loginData.value.user_name === "" || !/[a-zA-Z0-9]{6,18}$/.exec(loginData.value.user_name)) {
    uni.showToast({
      title: '用户名只能是6-18位大小写字母、数字(可组合)',
      icon: 'none',
      duration: 1500
    })
    return
  }

  if (loginData.value.password === "" || !/[a-zA-Z0-9]{6,18}$/.exec(loginData.value.password)) {
    uni.showToast({
      title: '密码只能是6-18位大小写字母、数字(可组合)',
      icon: 'none',
      duration: 1500
    })
    return
  }

  loginApi.login(loginData.value).then(async (res: ptAny) => {
    if (res.code === 200) {
      uni.clearStorageSync()
      uni.setStorageSync(xTokenCacheKey, {
        token: res.data.token,
        check_status: res.data.check_status,
        login_time: res.data.login_time,
        version: res.data.version,
      })
      uni.setStorageSync(LoginCacheKey, loginData.value)
      await store.setInit().then(async (r: ptAny) => {
      })
      uni.reLaunch({url: route.value})
    } else {
      uni.showToast({
        title: res.message,
        icon: 'none',
        duration: 1500
      })
    }
  })
}
</script>

<style scoped lang="scss">
	.login {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .header{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .img{
        width: 300rpx;
        height: 300rpx;
        border-radius: 50%;
      }
    }
    .content{
      width: 60%;
      .input {
        border: 0;
        color: var(--black);
        line-height: 70rpx;
        border-bottom: 1px solid #ccc;
        margin-top: 30rpx;
        padding-bottom: 20rpx;
      }

      .placeholder {
        color: #c0c3cb;
        font-size: 32rpx;
      }

      .tip{
        font-size: 28rpx;
        font-weight: bold;
        margin: 25rpx 0 0 0rpx;
        color: var(--black);
      }

      .submit {
        margin-top: 50rpx;
        height: 80rpx;
        background: $theme-color;
        color: #fff;
        border-radius: 45rpx;
        font-size: 32rpx;
        line-height: 80rpx;
      }
    }
	}

</style>
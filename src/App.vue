<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app"
import {useIndexStore} from "@/store"
import {AppInitOptionCacheKey} from "@/common/const"
// #ifdef WEB
import VConsole from 'vconsole'
// #endif

onLaunch((options) => {
  // #ifdef WEB
  if (import.meta.env.VITE_APP_ENV !== 'production'){
    new VConsole();
  }
  // #endif

  uni.setStorageSync(AppInitOptionCacheKey, options)
  useIndexStore().authorization(false)

  // #ifdef MP-WEIXIN
  checkUpdateWxapp()
  // #endif
})

onShow(() => {
  console.log("App Show")
})

onHide(() => {
  console.log("App Hide")
})

// #ifdef MP-WEIXIN
const checkUpdateWxapp = ()=>{
  let updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate(function(res) {
    // 请求完新版本信息的回调
  })
  updateManager.onUpdateReady(function(res) {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，重启应用以更新',
      success(res) {
        if (res.cancel) return
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    })
  })
  updateManager.onUpdateFailed(function(res) {
    // 新的版本下载失败
  })
}
// #endif
</script>
<style></style>

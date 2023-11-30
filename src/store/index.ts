import {defineStore} from 'pinia'
import {ref} from "vue"
import loginApi from "@/api/login"
import commonApi from "@/api/common"

import {AppInitCacheKey, AppNoticeCacheKey, WechatCacheCode, xTokenCacheKey} from "@/common/const"
import {buildLoginData, isWechat, parsePagePath} from "@/common/func";
import {byRedirectTo, byReLaunch} from "@/common/utils/jump";
import path from "path";

export const useIndexStore = defineStore('index', () => {
    const scene = ref({ // 场景值
        banner: { // 广告
        },
        agreement: {  // 协议
            user: 1,
        },
        upload: {}
    })

    const appInfo = ref({
        app_name: '', // 版权信息
        copyright: '', // 版权信息
        version: '',
    })

    const customerInfo = ref({ // 客服信息
        nick_name: '', // 昵称
        head_img: '', // 昵称
        phone: '', // 手机号
        wx_code: '', // 微信号
        wx_img: '', // 微信二维码
        work_time: '', // 工作时间
        prompt_text: '', // 工作时间
        remark: '', // 备注
    })

    const setInit = async (isForce?: boolean)=>{
        let initInfo = uni.getStorageSync(AppInitCacheKey)
        if (initInfo && !isForce) {
            scene.value = initInfo.scene
            customerInfo.value = initInfo.other.customer_info
            appInfo.value.app_name = initInfo.other.app_name
            appInfo.value.copyright = initInfo.other.copyright
            appInfo.value.version = initInfo.other.version
            return Promise.resolve()
        } else {
            return commonApi.getInitInfo().then((res: ptAny) => {
                if (res.code === 200) {
                    uni.setStorageSync(AppInitCacheKey, res.data)
                    scene.value = res.data.scene
                    customerInfo.value = res.data.other.customer_info
                    appInfo.value.app_name = res.data.other.app_name
                    appInfo.value.copyright = res.data.other.copyright
                    appInfo.value.version = res.data.other.version
                }
            })
        }
    }

    const loginSuccess = async (res: ptAny, route: string) => {
        // todo 自行实现未注册逻辑 比如: 公众号未注册 跳转到登录页触发弹窗授
        // 登录成功
        if (res.code === 200) {
            uni.setStorageSync(xTokenCacheKey, {
                token: res.data.token,
                login_time: res.data.login_time,
                version: res.data.version,
            })
            await setInit(true).then(async r => {
            })
            byReLaunch(route)
        } else {
            await uni.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 1500
            })
            uni.setStorageSync(AppNoticeCacheKey, JSON.stringify(res.data.message))
            byRedirectTo('/pages/notice')
        }
    }

    const authorization = async (isForce?: boolean) => {
        let xTokenCache = uni.getStorageSync(xTokenCacheKey)
        if (xTokenCache && !isForce) {
            await setInit().then(async (r: ptAny) => {
            })
            return
        }

        let pages = getCurrentPages()
        let route: ptAny = '/pages/index/index'
        if (pages.length) {
            route = pages[pages.length - 1].route
            if (/^pages/.test(route)) {
                route = '/' + route
            }
        }

        // #ifdef WEB
        if (isWechat()) {
            // 获取页面url
            let local = window.location.href
            // @ts-ignore
            // 获取code
            let code = parsePagePath(local)["code"]
            let wechatAppId = ""
            let wechatScope = "snsapi_base"
            // 获取之前的code 。 避免出现新旧code
            let oldCode = uni.getStorageSync(WechatCacheCode)
            if (code === null || code === '' || code === 'undefined' || code === oldCode) {
                // 如果没有code，请求获取code
                let uri = encodeURIComponent(local)
                // 设置旧的code为0，避免死循环
                uni.setStorageSync('wechatCode', 0)
                window.location.href =
                    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatAppId}&redirect_uri=${uri}&response_type=code&scope=${wechatScope}&state=123#wechat_redirect`
                return
            } else {
                // 保存最新code
                uni.setStorageSync(WechatCacheCode, code)
                let res: ptAny = await loginApi.wechatWebLogin(code)
                await loginSuccess(res, route)
                return
            }
        } else {
            byReLaunch("/pages/login")
        }
        // #endif

        // #ifdef MP-WEIXIN

        uni.login({
            provider: 'weixin', //使用微信登录
            success: function (loginRes) {
                loginApi.wxMiniLogin(buildLoginData(loginRes.code)).then(async (res: any) => {
                    await loginSuccess(res, route)
                })
            }
        });
        // #endif
    }

    return {
        scene, appInfo,customerInfo,setInit,
        authorization
    }
});
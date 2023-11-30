import {defineStore} from "pinia"
import {ref} from "vue"
import commonApi from "@/api/common"
import {buildStaticSrc} from "@/common/func"

export const useJwxStore = defineStore('jwx', () => {

    const jwxRes = ref({
        url: "",
        data: null,
    })

    const init = async (callback: Function) => {
        // 记录进入app时的url
        //  @ts-ignore
        if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
        //  @ts-ignore
            window.entryUrl = location.href.split('#')[0]
        }

        let isIos = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
        // 进行签名的时候  Android 不用使用之前的链接， ios 需要
        //  @ts-ignore
        let signLink = isIos ? window.entryUrl : location.href.split('#')[0]
        //获取当前url然后传递给后台获取授权和签名信息，后台需要解码才能使用
        let url = encodeURIComponent(signLink);

        if (jwxRes.value.url ===  url) {
            //  @ts-ignore
            window.jWeixin.ready(() => {
                // console.log('config注入成功')
                // window.alert('签名的URL：'+ signLink)
                callback && callback()
            })
            return
        }

        //服务端进行签名
        let res: ptAny = await commonApi.getJssdk(url)
        jwxRes.value.url = url
        jwxRes.value.data = res.data

        // 注意此处的返回值
        //  @ts-ignore
        window.jWeixin.config(jwxRes.value.data);
        //  @ts-ignore
        window.jWeixin.ready(() => {
            console.log('config注入成功')
            // window.alert('签名的URL：'+ signLink)
            callback && callback()
        })
        //  @ts-ignore
        window.jWeixin.error((res) => {
            console.log('window.jWeixin.error', res)
        })
    }

    // 自定义分享
    const share = (params: ptAny) => {
        init(() => {
            let shareData = {
                title: params?.title || '默认标题',
                desc: params?.desc || '默认描述',
                link: params?.link || window.location.href,
                imgUrl: params?.cover_img || buildStaticSrc("images/default1x1.png"),
                success: (res: ptAny) => {
                    //用户点击分享后的回调，这里可以进行统计
                    params?.success()
                }
            }
            //分享给朋友接口
            //  @ts-ignore
            window.jWeixin.onMenuShareAppMessage(shareData)
            //分享到朋友圈接口
            //  @ts-ignore
            window.jWeixin.onMenuShareTimeline(shareData)
        }).then(r => {})
    }

    return {
        init,
        share
    }
})
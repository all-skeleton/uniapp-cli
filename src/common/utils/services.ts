import Request from '@/common/utils/request'
import {AppNoticeCacheKey, xTokenCacheKey} from "@/common/const"
import {useIndexStore} from '@/store'

Request.use( (config: utilsType.requestConfig) => {
	if (!config.header) {
		config.header = {}
	}

	let authorization = uni.getStorageSync(xTokenCacheKey)

	config.header['Authorization'] = 'Bearer ' + (authorization ? authorization.token : '')

	if (!config.url.startsWith('https://') && !config.url.startsWith('http://')) {
		let url = "";
		// #ifdef WEB
		url = import.meta.env.VITE_APP_API_HTTP
		// #endif
		// #ifdef MP-WEIXIN
		url = import.meta.env.VITE_APP_API_HTTPS
		// #endif;

		config.url = url + "/" + config.url
	}

	return config
},  (response: ptAny) => {
	switch (response.data.code) {
		case 10006: // 参数错误
		case 1002: // 参数错误
			uni.showToast({
				title: response.data.message,
				icon: 'none',
				duration: 2000
			}).then(r => {})
			break
		case 10001: // token 无效
			useIndexStore().authorization(true)
			break
		case 10002: // 账号被锁定
			uni.setStorageSync(AppNoticeCacheKey, response.data)
			uni.redirectTo({
				url: '/pages/notice'
			}).then(r => {})
			break
		case 10003: // 跳转到登录页
			uni.redirectTo({
				url: '/pages/login'
			}).then(r => {})
			break
		case 10004: // 关站维护
			uni.setStorageSync(AppNoticeCacheKey, response.data)
			uni.redirectTo({
				url: '/pages/notice'
			}).then(r => {})
			break
		case 10005: // 清空所有缓存数据
			uni.clearStorageSync()
			break
	}
	return response
})

export default Request

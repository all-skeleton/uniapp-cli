import request from '@/common/utils/services'

export default {
    login(data: ptAny) {
        return request.get('login/index', data)
    },

    wxMiniLogin(data: ptAny) {
        return request.get('login/wx-mini-login', data)
    },

    wechatWebLogin(code?: string){
        return request.get('common/wechat-web-login', {code: code})
    }
}
import request from '@/common/utils/services'

export default {
    getInitInfo() {
        return request.get('common/init')
    },

    getJssdk(url?: string){
        return request.get('common/jssdk', {url: url})
    }
}
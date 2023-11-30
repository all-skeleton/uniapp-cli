import request from '@/common/utils/services'

export default {
    getMine(){
        return request.get('user/mine')
    },

    getUserList(){
        return request.get('user/list')
    },
}
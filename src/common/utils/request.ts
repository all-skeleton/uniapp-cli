class RequestService {
    protected before: ptAny[];
    protected after: ptAny[];

    constructor() {
        this.before = []
        this.after = []
    }

    static handleIntercept(handles: ptAny, data: utilsType.requestConfig | ptAny) {
        return handles.reduce((old: ptAny, current: ptAny) => {
            return current(old)
        }, data)
    }

    use(before: ptAny, after: ptAny) {
        typeof before === 'function' && this.before.push(before)
        typeof after === 'function' && this.after.push(after)
    }

    get(url: ptAny, data?: ptAny, is_next?: boolean) {
        return this.request({
            url,
            data,
            method: 'GET',
            is_next: is_next ? is_next : false
        })
    }

    post(url: ptAny, data?: ptAny, is_next?: boolean) {
        return this.request({
            url,
            data,
            method: 'POST',
            is_next: is_next ? is_next : false
        })
    }

    put(url: ptAny, data?: ptAny, is_next?: boolean) {
        return this.request({
            url,
            data,
            method: 'PUT',
            is_next: is_next ? is_next : false
        })
    }

    delete(url: ptAny, data?: ptAny, is_next?: boolean) {
        return this.request({
            url,
            data,
            method: 'DELETE',
            is_next: is_next ? is_next : false
        })
    }

    request(config: utilsType.requestConfig) {
        let _config = RequestService.handleIntercept(this.before, config)
        return new Promise((resolve, reject) => {
            uni.request({
                ..._config,
                ...{
                    success: (res: ptAny) => {
                        let response = RequestService.handleIntercept(this.after, res)
                        if (response && response.statusCode === 200) {
                            resolve(response.data)
                        } else {
                            reject(response.data)
                        }
                    },
                    fail: (err: ptAny) => {
                        reject(err)
                    }
                }
            })
        })
    }
}

const request = new RequestService()
export default request
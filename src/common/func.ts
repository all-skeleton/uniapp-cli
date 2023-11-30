import {AppInitOptionCacheKey} from "@/common/const"

/**
 * uploadCos.
 * 上传到七牛云
 * @param {any} qiniuInfo 七牛云预生成的信息
 * @param {String} filePath 文件的临时路径
 * @returns {Promise<any>}
 */
export function uploadQiniu(qiniuInfo: utilsType.qiniuInfo, filePath: string) {
    return new Promise(async (resolve, reject) => {
        uni.uploadFile({
            url: qiniuInfo.service_url,
            filePath: filePath,
            name: 'file',
            formData: {
                token: qiniuInfo.token,
                key: qiniuInfo.path
            },
            success: (res: ptAny) => {
                resolve(JSON.parse(res.data));
            },
            fail: (err: ptAny) => {
                reject(err);
            }
        })
    })
}

/**
 * 构建登录参数.
 * @param code
 */
export function buildLoginData(code: string): object {
    /**
     * @var options App.LaunchShowOption
     */
    let options = uni.getStorageSync(AppInitOptionCacheKey)
    let loginData: ptAny = {}
    loginData.code = code
    loginData.path = options.path
    loginData.scene = options.scene
    // 邀请人ID
    loginData.sid = 1
    if (options?.query?.sid) {
        loginData.sid = options?.query?.sid
    }
    if (options?.shareTicket) {
        loginData.share_ticket = options.shareTicket
    }
    return loginData
}


/**
 * 获取静态资源 url 格式.
 * @param src
 */
export function buildStaticUrl(src: string) {
    return "url(" + buildStaticSrc(src) + ")"
}

/**
 * 获取静态资源 src 格式.
 * @param src
 */
export function buildStaticSrc(src: string) {
    let url = "";
    // #ifdef WEB
    url = import.meta.env.VITE_APP_STATIC_HTTP
    // #endif
    // #ifdef MP-WEIXIN
    url = import.meta.env.VITE_APP_STATIC_HTTPS
    // #endif;
    return url + "/" + src + '?v=' + import.meta.env.VITE_APP_VERSION
}

/**
 * 美化时间 秒.
 * @param seconds
 */
export function formatTime(seconds: number) {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    minutes = minutes % 60;
    seconds = seconds % 60;

    let timeString = "";

    if (hours > 0) {
        timeString += hours + ":";
    }

    if (minutes < 10) {
        timeString += "0" + minutes + ":";
    } else {
        timeString += minutes + ":";
    }

    if (seconds < 10) {
        timeString += "0" + seconds;
    } else {
        timeString += seconds;
    }

    return timeString;
}

/**
 * 格式化时间 秒.
 * @param seconds
 */
export function formatSeconds(seconds: number) {
    if (seconds < 60){
        return seconds + '秒'
    }
    if (seconds < 3600) {
        let y = seconds % 60
        return Math.trunc(seconds / 60) + (y > 0 ? ("." + y) : '') + '分钟'
    }
    return (seconds / 3600).toFixed(2) + '小时'
}

/**
 * 解析 path 参数.
 * @param pagePath
 */
export function parsePagePath(pagePath: string) {
    let pathAndQuery = pagePath.split('?');
    let path = pathAndQuery[0];
    let queryParams = {};

    if (pathAndQuery.length > 1) {
        let queryString = pathAndQuery[1];
        let queryArray = queryString.split('&');

        for (let query of queryArray) {
            let [key, value] = query.split('=');
            // @ts-ignore
            queryParams[key] = value;
        }
    }
    return { path, queryParams };
}

/**
 * 将对象拼接为url字符串.
 * @param obj
 */
export function objectToQueryString(obj: ptAny) {
    return Object.entries(obj)
        // @ts-ignore
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

/**
 * 是否本地文件.
 * @param path
 */
export function isLocalPath(path: string) {
    if (path.startsWith("wxfile://")) {
        return true
    }

    if (path.startsWith("http://tmp")) {
        return true
    }

    if (path.startsWith("blob:")) {
        return true
    }

    if (path.startsWith("https://tmp")) {
        return true
    }

    if (path.startsWith("file://")) {
        return true
    }

    return false;
}

/**
 * true是微信客户端，false不是微信客户端.
 */
export function isWechat() {
    // @ts-ignore
    return window.navigator.userAgent.toLowerCase().match(/micromessenger/i) == 'micromessenger'
}
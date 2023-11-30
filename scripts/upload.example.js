const shell = require('shelljs')
const qiniu = require('qiniu')
const {loadEnv} = require("vite")

const mac = new qiniu.auth.digest.Mac("", "")

const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0

let mode = process.argv[2] === "production" ? "production" : "development"

let env = loadEnv(mode, process.cwd())

let key = process.argv[2] === "production" ? (env.VITE_APP_NAME + "/static-pro") :  (env.VITE_APP_NAME + "/static-dev")
shell.find('src/assets').forEach((fileName) => {
    if (/\.(png|jpg|jpeg|gif|webp|mp3|mp4)$/.test(fileName)) {
        let formUploader = new qiniu.form_up.FormUploader(config);
        let putExtra = new qiniu.form_up.PutExtra();
        // 文件上传
        let uploadToken = (new qiniu.rs.PutPolicy({
            scope: 'aby-static:' + key + '/' + fileName.slice(11),
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"mimeType":"$(mimeType)"}'
        })).uploadToken(mac)
        formUploader.putFile(uploadToken, key + '/' + fileName.slice(11), fileName, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                throw respErr
            }
            if (respInfo.statusCode === 200) {
                console.log('respBody', respBody)
            } else {
                console.log(respInfo.statusCode)
                console.log(respBody)
            }
        }).then(r  =>{})
        console.log(fileName.slice(11))
        console.log(key + '/' +fileName.slice(11))
    }
})
console.log("大功告成！！！")

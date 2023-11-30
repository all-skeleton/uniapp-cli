# uniapp-cli
uniapp cli 版本
## 功能概览
- [x] h5 且 dev 默认引入vconsole
- [x] 基础登录逻辑
- [x] 微信公众号jssdk
- [x] 静态资源处理(传七牛云、scss及模板引入资源)
- [x] 微信小程序版本检测

## 目录结构
```text
uniapp-cli
├─mock  模拟请求接口
├─scripts  一些脚本
├─src 
│  ├─api  用于存放api接口定义
│  ├─assets  静态资源
│  ├─common
│  │   ├─scss  公共scss
│  │   ├─utils  工具封装
│  │   ├─const.ts  常量定义
│  │   ├─func.ts  通用函数
│  │   └─ ...
│  ├─components  公共组件
│  ├─logic  一些复杂界面的逻辑层
│  ├─pages  视图文件
│  ├─static  静态文件
│  ├─store  pinia
│  │   ├─index.ts  默认登录逻辑封装
│  │   ├─jwx.ts  微信公众号jssdk封装
│  ├─types  ts自定义文件夹
│  ├─uni_modules  uniapp插件目录
```

## 开始
### 环境变量说明
> .env.development 为 dev环境变量配置, .env.production为 build环境变量配置
> 
> development环境下默认开启proxy和mock, VITE_APP_API_BASE为真实的接口地址
> 
> 更多自行查看vite.config.ts

### 静态文件上传以及应用
> 复制scripts/upload.example.js 为 scripts/upload.js
> 修改说明如下:
> ```
> const mac = new qiniu.auth.digest.Mac("七牛云ak", "七牛云sk")
> ```
> 配置完成执行 node ./scripts/upload.js
> 
> 引用静态文件示例:
> ```html
> <template lang="pug">
> div.login
>   div.header
>     image.img(:src="buildStaticSrc('logo.png')")
> </template>
> <script lang="ts" setup>
> import {buildStaticSrc} from "@/common/func"
> </script>
> <style scoped lang="scss">
> .back {
>     flex: 1;
>     flex-shrink: 0;
>     width: 100%;
>     background-repeat: no-repeat;
>     background-position: center;
>     background-size: 500rpx;
>     /*这里的 buildStaticUrl scss函数封装在src/common/scss/import.scss  */
>     background-image: buildStaticUrl('images/bg.png')
> }
> </style>
> ```


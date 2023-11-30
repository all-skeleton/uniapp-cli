import {defineMock} from 'vite-plugin-mock-dev-server'

export default defineMock([
    {
        url: '/api/login/index',
        body: {
            code: 200,
            data: {
                token: "232133211",
                check_status: false,
                login_time: 1723456656,
                version: "0.0.1",
            }
        }
    },
    {
        url: '/api/common/init',
        body: {
            code: 200,
            data: {
                other: {
                    customer_info: {
                        nick_name: "客服一号"
                    },
                    app_name: "测试APP",
                    copyright: "copyright",
                    version: "0.0.1",
                },
                scene: {
                    banner: {},
                    agreement: {},
                    upload: {},
                },
            }
        }
    },
    {
        url: '/api/user/list',
        body: {
            code: 200,
            data: {
                list: [
                    {
                        head_img: "https://pic4.zhimg.com/80/v2-22ebcc8e74383d357e737031d4f7bf7f_720w.webp",
                        nick_name: "多情多义",
                        mobile: "18224515487",
                        created_at: "2023-11-30 09:22:53",
                    },
                    {
                        head_img: "https://img2.woyaogexing.com/2023/11/29/8cd124816e269c658a5b7ef5b4c04742.jpg",
                        nick_name: "性格很个",
                        mobile: "18224515487",
                        created_at: "2023-11-30 09:22:53",
                    }, {
                        head_img: "https://pic4.zhimg.com/80/v2-22ebcc8e74383d357e737031d4f7bf7f_720w.webp",
                        nick_name: "喜欢都会有结",
                        mobile: "18224515487",
                        created_at: "2023-11-30 09:22:53",
                    }, {
                        head_img: "https://img2.woyaogexing.com/2023/11/29/962ee7372c03b1d4902fbe96a7151bf7.jpg",
                        nick_name: "缓缓月",
                        mobile: "18224515487",
                        created_at: "2023-11-30 09:22:53",
                    }, {
                        head_img: "https://img2.woyaogexing.com/2023/11/28/61a0a0d8ad189a597ac7b697fdbc0017.jpg",
                        nick_name: "弥漫 这个世",
                        mobile: "18224515487",
                        created_at: "2023-11-30 09:22:53",
                    }, {
                        head_img: "https://img2.woyaogexing.com/2023/11/25/fdc142f71a4879b1931a9afc7226fc91.jpg",
                        nick_name: "故事里 流着自",
                        mobile: "18224515487",
                        created_at: "2023-11-30 09:22:53",
                    },
                ]
            },
        }
    },
])
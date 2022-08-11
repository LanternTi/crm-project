import axios from 'axios'
class Arequest {
    constructor(config) {
        //在new的时候我们通常可以传入一个对象 里面装着配置
        this.instance = axios.create(config)
        //config 里面可以传入interceptors，里面可以有多个拦截器 如果没有的话 将会是undifine
        this.interceptors = config.interceptors
        //  此处是实例对应的拦截器
        // 此处先进行判断判断有没有interceptors和interceptors.requestInterceptor
        if (
            (config.interceptors && config.interceptors.requestInterceptor) ||
            (config.interceptors && config.interceptors.requestInterceptorCath)
        ) {
            //条件符合后 在instance 拦截请求中添加这两个拦截器
            this.instance.interceptors.request.use(
                this.interceptors.requestInterceptor,
                this.interceptors.requestInterceptorCath
            )
        }
        if (
            //同理添加 相应响应拦截器
            (config.interceptors && config.interceptors.responceInterceptor) ||
            (config.interceptors && config.interceptors.responceInterceptorCath)
        ) {
            this.instance.interceptors.response.use(
                this.interceptors.responceInterceptor,
                this.interceptors.responceInterceptorCath
            )
        }
        //有时候单给我们个别实例添加拦截器可能不符合我们的需求 比如我们在项目用到了axios请求的时候页面都会出现正在加载这个图标 这时候我们就需要这个给所有实例都添加共同的拦截器
        //    给所有实例添加的共同的拦截器
        this.instance.interceptors.request.use(
            (config) => {
                return config
            },
            (err) => {
                return err
            }
        )
        this.instance.interceptors.response.use(
            (res) => {
                const data = res.data
                return data
            },
            (err) => {
                if (err.response.data.status === 404) {
                    console.log('错误')
                }
                return err
            }
        )
    }

    request(config) {
        return new Promise((resolve) => {
            if (config.interceptors && config.interceptors.requestInterceptor) {
                //对配置进行转化 因为requestInterceptor本身就是一个函数  参数接收配置后可以对配置进行一些操作再返回出去
                config = config.interceptors.requestInterceptor(config)
            }
            this.instance
                .request(config)
                .then((res) => {
                    if (config.interceptors && config.interceptors.responceInterceptor) {
                        res = config.interceptors.responceIntercepto(res)
                    }
                    resolve(res)
                })
                .catch((err) => {
                    return err
                })
        })
    }
    get(config) {
        return this.request({ ...config, method: 'GET' })
    }
    post(config) {
        return this.request({ ...config, method: 'POST' })
    }
    delete(config) {
        return this.request({ ...config, method: 'DELETE' })
    }

    patch(config) {
        return this.request({ ...config, method: 'PATCH' })
    }
}
export default Arequest
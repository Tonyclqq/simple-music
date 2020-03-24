import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//如果想写一个Vue插件，该插件需要有个公开方法install，这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
const MyHttpServe = {}//对象才能点方法

MyHttpServe.install = (Vue) => {
    axios.defaults.baseURL = 'https://v1.itooi.cn/tencent/'
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.interceptors.request.use(config =>{
        NProgress.start()
        return config
    },function(error){
        return Promise.reject(error)
    })
    //在response拦截器中，隐藏进度条  nprogress.done()
    axios.interceptors.response.use(config =>{
        NProgress.done()
        return config
    })
    // 4. 添加实例方法给Vue函数添加一个原型属性$axios 指向Axios
    Vue.prototype.$http = axios
}
export default MyHttpServe
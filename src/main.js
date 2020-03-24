import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'

//移动端点击300ms延迟的问题
import fastclick from 'fastclick'
fastclick.attach(document.body)
// 引入路由
import router from './router/index'
//全局引入index.stylus 
import 'common/stylus/index.styl'
//引入网络http请求
import MyHttpServe from 'api/http'
Vue.use(MyHttpServe)
//引用lazyload
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  loading:require('common/image/default.png')
})
//导入 vuex
import store from './store'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

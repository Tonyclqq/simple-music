# simple-music

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# vue-cli4 创建项目，初始化项目

## 基础css样式分析
```txt
/src/common/stylus/variable.styl   --->设计颜色风格样式
/src/common/stylus/base.styl  --->基础样式
```

**引入index.stylus到 main.js当中**

```js
//引入index.stylus 
import 'common/stylus/index.styl'
```
## 在package.json中多添加如下几个依赖
```json
"dependencies": {
    "babel-runtime":"6.26.0",//es语法转义
    "fastclick":"1.0.6"//移动端点击300ms延迟的问题
  },
"devDependencies": {
    "babel-polyfill": "6.26.0",//es6的api转义
}
```

**在main.js中导入这几个依赖** 
```js
import 'babel-polyfill'

import fastclick from 'fastclick'
fastclick.attach(document.body)

```

**m-header组建的创建**

```vue
<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
     <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link> 
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
```

**在App.vue中去导入m-header**

 ```
1、import MHeader from '@/components/m-header/m-header'
2、 components: {
    MHeader
  }
3、 <m-header></m-header>
 ```

## 路由配置+顶部导航栏开发

### 路由的配置

- 安装vue-router`npm i vue-router -S`

- 在router/index.js

- ```
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  
  
  const Rank = () => import('@/components/rank/rank.vue')
  const Recommend = () => import('@/components/recommend/recommend.vue')
  const Search = () => import('@/components/search/search.vue')
  const Singer = () => import('@/components/singer/singer.vue')
  const routes = [
     {
        path: '',
        redirect: '/recommend'
     },
     {
        name: 'rank',
        path: '/rank',
        component: Rank
     },
     {
        name: 'recommend',
        path: '/recommend',
        component: Recommend
     },
     {
        name: 'singer',
        path: '/singer',
        component: Singer
     },
     {
        name: 'search',
        path: '/search',
        component: Search
     }
  ]
  const router = new VueRouter({
     routes
  })
  export default router
  ```

- 在main.js中引入 `import router from ‘./router/index.js’`

- 在实例上挂载```

- ```
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
  ```

- 在App.vue中  <router-view></router-view>

### 顶部导航栏组件的开发

tab组件

```vue
<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
```

## axios的封装和轮播图的数据的获取&轮播组件开发

1. ###  axios的封装

   1. 先安装axios `npm i axios -S`
   2. [看自己的博客](https://blog.csdn.net/okboy519/article/details/104908517)

2. ### 轮播组件数据获取

   1. 只获取了轮播图的图片，$\color{red}{未获取到轮播图的链接}$.

   2. ```
      async getSwiper(){
               const res = await this.$http.get(`banner`)
               this.recommends = res.data.data
               console.log(this.recommends)
      }
      ```

3. ### 轮播组件开发

   1. 先创建一个slider.vue

   2. 编写html和css代码

   3. ```vue
      <template>
        <div class="slider" ref="slider">
          <div class="slider-group" ref="sliderGroup">
            <slot></slot>
          </div>
          <div class="dots"></div>
        </div>
      </template>
      
      <script>
      import BScroll from "better-scroll";
      import {addClass} from 'common/js/dom.js'
      export default {
        name: "slider",
        components: {},
        props: {
          loop: {
            type: Boolean,
            default: true
          },
          autoPlay: {
            type: Boolean,
            default: true
          },
          interval: {
            type: Number,
            default: 4000
          }
        },
        data() {
          return {};
        },
        mounted() {
          setTimeout(() => {
              this._setSliderWidth()
              this._initSlider()
          }, 20);
        },
        methods:{
            //设置slider宽度
            _setSliderWidth(){
                //获取sliderGroup的children个数  https://www.runoob.com/jsref/prop-element-children.html
                this.children = this.$refs.sliderGroup.children
      
                let width = 0 
                //获取slider父容器轮播宽度https://www.softwhy.com/article-9001-1.html
                let sliderWidth = this.$refs.slider.clientWidth
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i]
                    addClass(child,'slider-item')
                    child.style.width = sliderWidth + 'px'
                    width +=sliderWidth
                }
                if(this.loop){
                    width+=2*sliderWidth
                }
                this.$refs.sliderGroup.style.width = width +'px'
            },    
            //初始化slider
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX:true,
                    scrollY:false,
                    momentum:false,
                    snap:true,
                    snapLoop:this.loop,
                    snapThreshold:0.3,
                    snapSpeed:400,
                    click:true
                })
            }
        }
      };
      </script>
      <style lang=stylus scoped>
      @import '~common/stylus/variable';
      
      .slider {
        min-height: 1px;
      
        .slider-group {
          position: relative;
          overflow: hidden;
          white-space: nowrap;
      
          .slider-item {
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
      
            a {
              display: block;
              width: 100%;
              overflow: hidden;
              text-decoration: none;
            }
      
            img {
              display: block;
              width: 100%;
            }
          }
        }
      
        .dots {
          position: absolute;
          right: 0;
          left: 0;
          bottom: 12px;
          text-align: center;
          font-size: 0;
      
          .dot {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;
      
            &.active {
              width: 20px;
              border-radius: 5px;
              background: $color-text-ll;
            }
          }
        }
      }
      </style>
      ```

   4. [具体分析看](https://blog.csdn.net/okboy519/article/details/104909325)

   5. ```vue
      <template>
        <div class="slider" ref="slider">
          <div class="slider-group" ref="sliderGroup">
            <slot></slot>
          </div>
          <div class="dots">
            <span
              class="dot"
              v-for="(item,index) in dots"
              :key="index"
              :class="{active:currentPageIndex === index}"
            ></span>
          </div>
        </div>
      </template>
      
      <script>
      import BScroll from "better-scroll";
      import { addClass } from "common/js/dom.js";
      export default {
        name: "slider",
        components: {},
        props: {
          loop: {
            type: Boolean,
            default: true
          },
          autoPlay: {
            type: Boolean,
            default: true
          },
          interval: {
            type: Number,
            default: 4000
          }
        },
        data() {
          return {
            dots: [],
            currentPageIndex: 0
          };
        },
        mounted() {
          setTimeout(() => {
            this._setSliderWidth();
            this._initDots();
            this._initSlider();
            //自动播放
            if (this.autoPlay) {
              this._play();
            }
          }, 20);
          window.addEventListener('resize',()=>{
            if(!this.slider){
              return
            }
            this._setSliderWidth(true)
            this.slider.refresh()
          })
        },
        methods: {
          //设置slider宽度
          _setSliderWidth(isResize) {
            //获取sliderGroup的children个数  https://www.runoob.com/jsref/prop-element-children.html
            this.children = this.$refs.sliderGroup.children;
            console.log(this.children.length);
            let width = 0;
            //获取slider父容器轮播宽度https://www.softwhy.com/article-9001-1.html
            let sliderWidth = this.$refs.slider.clientWidth;
            for (let i = 0; i < this.children.length; i++) {
              let child = this.children[i];
              addClass(child, "slider-item");
              child.style.width = sliderWidth + "px";
              width += sliderWidth;
            }
            if (this.loop && !isResize) {
              width += 2 * sliderWidth;
            }
            this.$refs.sliderGroup.style.width = width + "px";
          },
          //初始化slider
          _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
              scrollX: true,
              scrollY: false,
              momentum: false,
              snap: true,
              snapLoop: this.loop,
              snapThreshold: 0.3,
              snapSpeed: 400,
            });
            this.slider.on("scrollEnd", () => {
              let pageIndex = this.slider.getCurrentPage().pageX;
              if (this.loop) {
                pageIndex -= 1;
              }
              this.currentPageIndex = pageIndex;
              if (this.autoPlay) {
                clearTimeout(this.timer);
                this._play();
              }
            });
          },
          //初始化dots
          _initDots() {
            this.dots = new Array(this.children.length);
          },
          //自动播放
          _play() {
            let pageIndex = this.currentPageIndex + 1;
            if (this.loop) {
              pageIndex += 1;
            }
            this.timer = setTimeout(() => {
              this.slider.goToPage(pageIndex, 0, 400);
            }, this.interval);
          }
        },
        destroyed(){
          clearTimeout(this.timer)
        }
      };
      </script>
      <style scoped lang="stylus" rel="stylesheet/stylus">
      @import '~common/stylus/variable';
      
      .slider {
        min-height: 1px;
        position: relative;
      
        .slider-group {
          overflow: hidden;
          white-space: nowrap;
      
          .slider-item {
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
      
            a {
              display: block;
              width: 100%;
              overflow: hidden;
              text-decoration: none;
            }
      
            img {
              display: block;
              width: 100%;
            }
          }
        }
      
        .dots {
          position: absolute;
          right: 0;
          left: 0;
          bottom: 12px;
          text-align: center;
          font-size: 0;
      
          .dot {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;
      
            &.active {
              width: 20px;
              border-radius: 5px;
              background: $color-theme;
            }
          }
        }
      }
      </style>
      ```
      
      

## 歌单列表组件开发和数据的获取

1. ### 歌单组件的开发

   1. ```vue
      <div class="recommend-list">
              <h1 class="list-title">热门MV推荐</h1>
              <ul>
                <li v-for="(item,index) in discList" class="item" :key="index">
                  <div class="icon">
                    <!-- 接口还没获取到 ,src暂不能绑定数据-->
                    <img width="102" height="60" :src="item.picurl" alt="">
                  </div>
                  <div class="text">
                    <h2 class="name">{{item.singers[0].name}}</h2>
                    <p class="desc">{{item.title}}</p>
                  </div>
                </li>
              </ul>
            </div>
      ```

   2. 

2. ### 歌单数据获取

   1. ```js
      const res = await this.$http.post(`mv/hot?&pageSize=30&page=0`)
             if(res.status === 200){
               this.discList = res.data.data.list
               console.log(res.data.data.list)
             }
      ```

3. ### 歌单界面优化

4. #### lazyload懒加载插件应用

   1. 安装插件：`npm i vue-lazyload -S`

   2. 在main.js中引用

      1. ```
         import VueLazyLoad from 'vue-lazyload'
         Vue.use(VueLazyLoad,{
           loading:require('common/image/default.png')
         })
         ```

   3. 将需要加载图片的地方由 `:src="item.picurl"`变成`v-lazy="item.picurl"`即可
   
5. #### loading基础组件开发和应用

   1. 创建loading.vue组件

   2. ```vue
      <template>
        <div class="loading">
          <img src="./loading.gif" height="24" width="24" alt="">
          <p class="desc">{{title}}</p>
        </div>
      </template>
      
      <script>
      
        export default {
         name: 'loading',
          components: {},
          props:{
              title:{
                  type:String,
                  default:'正在载入...'
              }
          },
      
        }
      
      </script>
      <style lang=stylus scoped>
      @import "~common/stylus/variable"
      .loading
          width 100%
          text-align center
          .desc
              line-height 20
              font-size $font-size-small
              color $color-text-l
      </style>
      ```

   3. 在其他组件中使用，导入，注册组件，在需要的地方要加个外部div

   4. ```
      <div class="loading-container" 
      	 v-show="!discList.length">
           <loading/>
      </div>
       .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-30%);
          }
          //这里是通过判断list.length,
          //如果不是1隐藏，如果不是0，显示
      ```

6. #### 歌手页面开发

   1. 获取数据

      1. ```js
          async getSinger() {
               const res = await       this.$http.post(`artist/list?sexId=-100&areaId=-100&genre=-100&index=-100&page=0&pageSize=30`)
               this.singers = res.data.data
             }
         ```

      2. 引入better-scroll，v-for循环遍历数据

      3. ```vue
         <template>
           <div class="singer" >
             <scroll class="list-view" :data="singers">
               <ul>
                   <li v-for="(item,index) in singers" class="list-group-item" :key="index" @click="toSingerDetails(index)">
                       <img class="avatar" :src="item.singer_pic" alt="">
                       <span class="name">{{item.singer_name}}</span>
                   </li>
               </ul>
           </scroll>
           </div>
         </template>
         <script>
         import Scroll from "@/base/scroll/scroll";
         export default {
           name: "singer",
           components: {
             Scroll
           },
           props: {},
           data() {
             return {
               singers:[]
             };
           },
           created() {
             this.getSinger();
           },
           methods: {
             async getSinger() {
               const res = await this.$http.post(`artist/list?sexId=-100&areaId=-100&genre=-100&index=-100&page=0&pageSize=30`)
               this.singers = res.data.data
             },
             //跳转到歌手详情
             toSingerDetails(index){
               console.log(index)
               //歌手详情：https://v1.itooi.cn/tencent/artist?id=003kBi0c1ckZB4
               //歌手音乐：https://v1.itooi.cn/tencent/song/artist?id=003kBi0c1ckZB4
               console.log(this.singers[index])
               this.$router.push({
                 path:'/singerdetails',
                 singer_mid:this.singers[index]
               })
             }
           },
          
         };
         </script>
         
         <style lang="stylus" scoped>
         @import '~common/stylus/variable';
         .singer
           position fixed
           top 88px
           bottom 0px
           overflow hidden
           .list-view
             height 100%
             overflow hidden
           .list-group-item
             display flex
             align-items center
             padding 30px 0 0 30px
             .avatar
               width 50px
               height 50px
               border-radius 50%
             .name
               margin-left 20px
               color $color-text-l
               font-size: $font-size-medium
         </style>
         ```

      4. 为循环对象注册个点击事件，目的是通过singers[index]将歌手的singer_mid传递到歌手详情页面

7. #### 歌手详情页面

   1. 给组件添加转场动画
   2. 通过
   
8. #### 播放器Vuex数据设计

   1. 







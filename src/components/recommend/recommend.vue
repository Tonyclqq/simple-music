<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a href="#">
                <img class="needsclick" :src="item.pic_info.url" alt  @load="loadImage"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门MV推荐</h1>
          <ul>
            <li
              v-for="(item,index) in discList"
              class="item"
              :key="index"
              @click="clickMvList(index)"
            >
              <div class="icon">
                <!-- 接口还没获取到 ,src暂不能绑定数据-->
                <img width="102" height="60" v-lazy="item.picurl" alt />
              </div>
              <div class="text">
                <h2 class="name">{{item.singers[0].name}}</h2>
                <p class="desc">{{item.title}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 如果不是1隐藏，如果不是0，显示 -->
      <div class="loading-container" v-show="!discList.length">
        <loading/>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from "@/base/slider/slider";
import Scroll from "@/base/scroll/scroll";
import Loading from "@/base/loading/loading";
export default {
  name: "recommend",
  components: {
    Slider,
    Scroll,
    Loading
  },
  props: {},
  data() {
    return {
      //轮播数据
      recommends: [],
      //歌单数据
      discList: []
    };
  },

  created() {
    this.getSwiper();
    this.getHotMv();
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    //获取swiper数据
    async getSwiper() {
      const res = await this.$http.post(`banner`);
      this.recommends = res.data.data;
      //console.log(this.recommends);
    },
    //获取歌单数据
    async getHotMv() {
      const res = await this.$http.post(`mv/hot?&pageSize=100&page=0`);
      if (res.status === 200) {
        this.discList = res.data.data.list;
        //console.log(res.data.data.list);
      }
    },
    //点击mv列表
    clickMvList(index) {
      //console.log();
      this.$router.push({
        path:'/mvplay',
        query:{
          mv_id:this.discList[index].vid
        }
      })
    },
    loadImage(){
      if(!this.checkLoaded){
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
      
    },
  },

  watch: {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 102px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-30%);
    }
  }
}
</style>
<template>
  <div class="singer">
    <scroll class="list-view" :data="singers">
      <ul>
        <li
          v-for="(item,index) in singers"
          class="list-group-item"
          :key="index"
          @click="toSingerDetails(index)"
        >
          <img class="avatar" v-lazy="item.singer_pic" alt />
          <span class="name">{{item.singer_name}}</span>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from "@/base/scroll/scroll";
import {mapMutations} from 'vuex'
export default {
  name: "singer",
  components: {
    Scroll,
  },
  props: {},
  data() {
    return {
      singers: []
    };
  },
  created() {
    this.getSinger();
  },
  methods: {
    //获取歌手列表
    async getSinger() {
      const res = await this.$http.post(
        `artist/list?sexId=-100&areaId=-100&genre=-100&index=-100&page=0&pageSize=30`
      );
      this.singers = res.data.data;
    },
    //跳转到歌手详情
    toSingerDetails(index) {
      this.$router.push({
        path:'/singerdetails',
        query:{
          singerInfo:this.singers[index]
        }
      })
      this.setSinger(this.singers[index])
    },
     ...mapMutations({
       setSinger:'SET_SINGER'
     })
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.singer {
  position: fixed;
  top: 88px;
  bottom: 0px;
  overflow: hidden;

  .list-view {
    height: 100%;
    overflow: hidden;
  }

  .list-group-item {
    display: flex;
    align-items: center;
    padding: 30px 0 0 30px;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .name {
      margin-left: 20px;
      color: $color-text-l;
      font-size: $font-size-medium;
    }
  }
}
</style>
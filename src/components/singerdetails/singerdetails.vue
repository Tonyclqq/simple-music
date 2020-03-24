<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from "@/components/music-list/music-list";
import { mapGetters } from "vuex";
export default {
  name: "singerdetails",
  components: {
    MusicList
  },
  props: {},
  data() {
    return {
      singerInfo: {},
      songs: []
    };
  },
  activated() {
    //获取歌手信息,通过路由的方式
    // this.singerInfo = this.$route.query.singerInfo
    // console.log(this.singerInfo)
    //通过vuex的方式拿到
    //获取歌手歌曲
    this.getSingerMusic();
  },
  computed: {
    title() {
      return this.singer.singer_name;
    },
    bgImage() {
      return this.singer.singer_pic;
    },
    ...mapGetters(["singer"])
  },
  created() {},
  beforeMount() {},

  mounted() {},

  methods: {
    // //歌手音乐：https://v1.itooi.cn/tencent/song/artist?id=003kBi0c1ckZB4
    async getSingerMusic() {
      const res = await this.$http.post(
        `song/artist?id=${this.singer.singer_mid}&pageSize=100`
      );
      // eslint-disable-next-line no-unused-vars
      // let song_customize  = {
      //   id:'songmid',
      //   singer:{},
      //   name:"songname",
      //   albumname:'albumname',
      //   image:`https://v1.itooi.cn/tencent/pic?id=003OUlho2HcRHC`,
      //   url:`https://v1.itooi.cn/tencent/url?id=003OUlho2HcRHC,001fXNWa3t8EQQ&quality=flac`
      // }
      // eslint-disable-next-line no-unused-vars
      var songList = []
      let dataList = res.data.data
     // console.log(res)
      if (res.data.code === 200) {
        //遍历数组对象，将需要的值从新组合成一个新的数组对象
        dataList.forEach(item => {
           songList.push({
             id:`${item.musicData.songid}`,
             mid:`${item.musicData.songmid}`,
             singer:`${item.musicData.singer[0].name}`,
             name:`${item.musicData.songname}`,
             duration:`${item.musicData.interval}`,
             albumname:`${item.musicData.albumname}`,
             image:`https://v1.itooi.cn/tencent/pic?id=${item.musicData.songmid}`,
             url:`https://v1.itooi.cn/tencent/url?id=${item.musicData.songmid}&quality=flac`,
            })
        });
        this.songs = songList
      } else {
        console.log(res.data.msg);
      }
    }
  },

  watch: {}
};
</script>
<style lang=stylus scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
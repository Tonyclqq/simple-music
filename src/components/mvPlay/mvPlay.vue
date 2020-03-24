<template>
  <div class="mv-content">
    <h1 class="list-title">MV播放</h1>
    <video :src="mvUrl" autoplay="autoplay" controls width="100%" preload="auto"></video>
  </div>
</template>

<script>
export default {
  name: "mvPlay",
  components: {},
  props: {},
  data() {
    return {
      mvId: "",
      mvUrl: ""
    };
  },
  activated() {
    this.mvId = this.$route.query.mv_id;
    console.log(this.mvId);
  },
  created() {
    
  },

  methods: {
   
  },
  watch: {}
};
</script>
<style lang=stylus scoped>
@import '~common/stylus/variable';

.mv-content {
  width: 100vw;
  overflow: hidden;

  .list-title {
    text-align: center;
    margin: 10px 0;
    color: #A9D3BB;
  }
}
</style>
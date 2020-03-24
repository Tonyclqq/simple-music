<template>
  <div class="login-wrap">
    <van-form @submit="onSubmit">
      <van-field 
        v-model="username" 
        name="phoneNumber" 
        label="手机号:" 
        placeholder="请输入手机号" />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码:"
        placeholder="请随便填写密码"
      />
      <div style="margin: 16px;">
        <van-button 
          round 
          plain 
          hairline 
          color="linear-gradient(to left, #fcd4d5 , #8da4d0);" 
          size="large" 
          native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mixins:[],
  created() {},
  computed: {},
  beforeMount() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log(values);
      if (values.phoneNumber === "" || values.password === "") {
        this.$dialog.alert({
          message: "请输入手机号或者密码"
        });
      } else {
        this.$dialog.alert({
          message:"欢迎光临，这里你可以听QQ音乐的Vip音乐哦",  
        })
        this.$router.push('musichall')
        
      }
    }
  },
  watch: {}
};
</script>
<style lang=stylus scoped>
/*fa7268珊瑚橙， */
$bg-color = #fa7268
$bg-color2 = #8da4d0

body {
  width: 100vw;
  height: 100vh;

  .login-wrap {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to top, $bg-color, $bg-color2);
  }
}
</style>
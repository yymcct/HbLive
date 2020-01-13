<template>
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="box">
      <div class="logo">
        <img :src="require('@/assets/images/expo/hbw.png')" />
      </div>
      <div class="con">火爆云展，专注服务展会、参展商，为展会、参展商提供线上展示宣传，方便快捷。</div>
      <div class="foot">CopyRight © 郑州火爆网络科技有限公司</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },
  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },
  components: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  background: #fff;
  height: 100vh;
  .box {
    .logo {
      margin: 75px auto;
      img {
        width: 197.5px;
        height: 66px;
        display: block;
        margin: 0 auto;
      }
    }
    .con {
      width: 70%;
      margin: 0 auto;
      font-size: 19px;
      line-height: 26px;
      color: rgb(31, 31, 31);
    //   text-indent:2em;
    }
    .foot {
      width: 100%;
      position: fixed;
      bottom: 20px;
      font-size: 10pt;
      color: #666;
      text-align: center;
    }
  }
}
</style>
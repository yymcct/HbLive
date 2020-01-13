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
      <h1 class="title">火爆云展小程序功能介绍</h1>
      <p class="desc">火爆云展小程序专注服务展会、参展商，为展会、参展商提供线上展示宣传，方便快捷。</p>
      <h2>一、功能组成：</h2>
      <p>展商、展品、直播、我的</p>

      <h2>二、功能介绍：</h2>
      <h3>1、展商</h3>
      <p>此栏目为展商名录，具体收录了当前展会的参展企业，展示企业名称、logo、主打产品等信息，点击相应的企业可进入企业详情页面，详细展现此企业的具体信息！</p>
      <h3>2、展品</h3>
      <p>此栏目为展品名录，具体收录了当前展会的参展企业的主打产品，展示产品名称、图片等信息，点击相应的产品可进入产品详情页面，详细展现此产品的具体信息！</p>
      <h3>3、直播</h3>
      <p>此栏目为当前展会的图文信息展示，用图片记录当前展会的盛况，让用户足不出户就可感受到展会的现场信息！</p>
      <h3>4、我的</h3>
      <p>此栏目为用户中心，用于用户管理查看自己的信息和记录！</p>
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

  components: {},

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  background: #fff;
  padding-bottom: 50px;
  .box {
    width: 90%;
    margin: 0 auto;
    h1 {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin: 25px 0;
    }
    h2 {
      font-size: 16px;
      font-weight: bold;
      margin: 20px 0;
    }
    h3 {
      font-size: 14px;
      font-weight: bold;
      margin: 10px 0;
    }
    p {
      font-size: 13px;
      margin: 10px 0;
      line-height: 18px;
      text-indent: 2em;
    }    
  }
}
</style>
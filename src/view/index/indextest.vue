<template>
  <div>
    <div>UA:{{ua}}</div>
    <div class="ios" @click="GoIos">IOS点我跳转</div>
    <div class="android" @click="GoAndroid">Android点我跳转</div>
    <p>Cookie{{ cook}}</p>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {
      ua: window.navigator.userAgent.toLowerCase(),
      toP: {
        url: "https://www.baidu.com",
        needCookie: true,
        isFull: true
      },
      cook: ""
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.cook = document.cookie;
  },

  methods: {
    GoIos() {
      var p = JSON.stringify(this.toP);
      console.log("开始跳转" + p);
      window.webkit.messageHandlers.callNativeFunction.postMessage(p);
      console.log("跳转结束");
    },
    GoAndroid() {
      var p = JSON.stringify(this.toP);
      console.log("开始跳转" + p);
      window.javaInterface.callNativeFunction(p);
      console.log("跳转结束");
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
div {
  margin-top: 20px;
}
.ios {
  background-color: aqua;
  line-height: 40px;
}
.android {
  background-color: burlywood;
  line-height: 40px;
}
p{
    width: 100vh;
}
</style>
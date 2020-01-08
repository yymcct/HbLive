<template>
  <div class="wapper">
    <van-loading class="loading" type="spinner" size="24px">登录中...</van-loading>
  </div>
</template>

<script>
import { api_loginByWeixin } from "@/api/weixin";
import { userInfoAPI } from "@/utils/auth";
export default {
  name: "WeixinLogin",
  data() {
    return {};
  },

  created() {
    const { code, state } = this.getUrlCode();

    if (!code || state !== "weixin") {
      const appid = "wxd1e722c69feb8990";
      const scope = "snsapi_userinfo";
      const redirectUri = location.href;
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=${scope}&state=weixin#wechat_redirect`;
    } else {
      api_loginByWeixin(code).then(res => {
        userInfoAPI.set(res.result);
        const from = userInfoAPI.getLoginFrom();
        if (from) {
          window.location.href = from;
        } else {
          this.$router.path("/index");
        }
      });
    }
  },
  methods: {
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      this.winUrl = url;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    }
  }
};
</script>
<style lang='scss' scoped>
.wapper {
  display: flex;
  justify-content: center;
  .loading {
    top: 20px;
  }
}
</style>
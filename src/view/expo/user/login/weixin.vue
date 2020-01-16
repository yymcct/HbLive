<template>
  <div class="wapper">
    <van-loading class="loading" type="spinner" size="24px">登录中...</van-loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { userInfoAPI } from "@/utils/auth";
import { api_loginByWeixin } from "@/api/weixin";
export default {
  name: "WeixinLogin",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      meetingId: "meeting/meetingId",
      meeting: "meeting/meeting"
    })
  },
  created() {
    const categoryIteam = 1;
    const { code, state } = this.getUrlCode();
    if (!code || state !== "weixin") {
      const appid = this.meeting.wxLogInAppId;
      const scope = "snsapi_userinfo";
      const redirectUri = location.href;

      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=${scope}&state=weixin#wechat_redirect`;
    } else {
      api_loginByWeixin({ code, categoryIteam }).then(res => {
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
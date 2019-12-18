<template>
  <div class="wrapper">
    <div class="live" id="live">
      <video-player
        :started="live.liveStarted"
        :banner="live.banner"
        :pullStreamAddress="live.pullStreamAddress"
        :hits="live.hits"
      ></video-player>
      <van-notice-bar class="noticebar" color="#1989fa" background="#ecf9ff">{{live.description}}</van-notice-bar>
    </div>

    <van-tabs v-model="active" animated title-active-color="#0084ff" color="#0084ff" swipeable>
      <!-- <van-tab title="聊天室">
        <div class="tab-content" :style="contentStyleObj">
          <chat />
        </div>
      </van-tab>-->
      <template v-for="iteam in live.liveColumns">
        <van-tab :title="iteam.name" v-bind:key="iteam.id">
          <images-wall
            v-if="iteam.hbLive_LiveColumnType==0"
            v-bind:style="contentStyleObj"
            :liveColumnId="iteam.id"
          ></images-wall>
          <rich-text
            v-else-if="iteam.hbLive_LiveColumnType==1"
            v-bind:style="contentStyleObj"
            :liveColumnId="iteam.id"
          ></rich-text>
        </van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { api_GetLiveDetails, api_GetWxShareContent } from "@/api/api";
import wx from "weixin-js-sdk";
import { NoticeBar, Tab, Tabs } from "vant";
// import chat from "./chat";
import VideoPlayer from "./videoPlayer";
import ImagesWall from "./imagesWall";
import RichText from "./richText";
export default {
  name: "LiveIndex",
  components: {
    [NoticeBar.name]: NoticeBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    // chat,
    VideoPlayer,
    ImagesWall,
    RichText
  },

  data() {
    return {
      live: null,

      active: 0,
      contentStyleObj: {
        height: "370px"
      }
    };
  },

  methods: {
    setContentHeight() {
      let livehight = document.getElementById('live').clientHeight;
      let tmphight = window.innerHeight - (livehight + 44) + "px";
      if (this.contentStyleObj.height != tmphight) {
        console.log(livehight);
        console.log(window.innerHeight);
        this.contentStyleObj.height = tmphight;
      }
    },
    GetLive() {
      api_GetLiveDetails({ id: this.$route.params.id }).then(res => {
        this.live = res.result;
        this.$nextTick(() => {
          this.setContentHeight();
        });
      });
    }
  },
  mounted() {
    this.GetLive();
    // this.$nextTick(() => {
    //   this.setContentHeight();
    // });
    // let _this =this;
    // setInterval(() => {
    //   _this.setContentHeight();
    // }, 1000);
    api_GetWxShareContent({ url: location.href.split("#")[0] }) //向服务端提供授权url参数，并且不需要#后面的部分
      .then(res => {
        console.log(res);
        wx.config({
          debug: true, // 开启调试模式,
          appId: "wxd1e722c69feb8990", // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: res.result.timeStamp, // 必填，生成签名的时间戳
          nonceStr: res.result.randomNum, // 必填，生成签名的随机串
          signature: res.result.signaTure, // 必填，签名，见附录1
          jsApiList: [
            "updateAppMessageShareData",
            "updateTimelineShareData",
            "openLocation",
            "getLocation"
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        var title = "山东儒商十二生肖酒业有限公司"; // 分享标题
        var link = "http://app.huobaowang.com/live/"; // 分享链接
        var description = "山东儒商十二生肖酒业有限公司"; // 分享描述
        var img =
          "http://www.9998.tv/uploadfile/compimg/2019/6-21/201962110165148541.jpg"; // 分享图标
        wx.ready(function() {
          //分享到朋友圈
          wx.updateAppMessageShareData({
            title: title, // 分享标题
            link: link, // 分享链接
            desc: description, // 分享描述
            imgUrl: img, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
              //alert("success");
            }
          });
          //分享给朋友
          wx.updateTimelineShareData({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: img, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
              //alert("success");
            }
          });
          wx.error(function(res) {
            console.log(res);
          });
        });
      });
  },
  watch: {
    $route() {
      this.GetLive();
    }
  }
};
</script>

<style scoped>
.live {
  width: 100%;
}
.noticebar {
  padding: 0px;
}
</style>

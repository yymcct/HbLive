<template>
  <div class="wrapper">
    <div class="live" ref="live">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        @ready="playerReadied"
      ></video-player>
      <van-notice-bar
        class="noticebar"
        color="#1989fa"
        background="#ecf9ff"
      >欢迎观看本场直播！点击右上角“•••”发送给亲朋好友、微信群、分享到朋友圈，让更多的朋友来观看直播、参与互动、分享精彩！商务直播适用：新品发布、营销会议、行业会议、峰会年会、室外观摩、农产推广等活动。火爆网直播合作热线：17719825376</van-notice-bar>
    </div>
    <van-tabs v-model="active" animated title-active-color="#0084ff" color="#0084ff" swipeable>
      <van-tab title="聊天室">
        <div class="tab-content" :style="contentStyleObj">
          <chat />
        </div>
      </van-tab>
      <van-tab title="现场图集">
        <div class="tab-content" :style="contentStyleObj">
          <image-total></image-total>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { api_GetWxShareContent } from "@/api/api";
import wx from "weixin-js-sdk";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import "videojs-contrib-hls";
import { NoticeBar, Tab, Tabs } from "vant";
import chat from "./chat";
import imageTotal from "./imageTotal";
export default {
  name: "live",
  components: {
    videoPlayer,
    [NoticeBar.name]: NoticeBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    chat,
    imageTotal
  },

  data() {
    return {
      playerOptions: {
        // videojs options
        muted: false, // 默认情况下将会消除任何音频。
        language: "zh-CN",
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "http://live.huobaowang.com/live/text1.m3u8" //这是hls流
          }
        ],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        width: document.documentElement.clientWidth,
        autoplay: true, //如果true,浏览器准备好时开始回放
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        fluid: true,
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        poster: "http://m.3456.tv/images/2019huodong.jpg" // 你的封面地址
      },
      active: 0,
      contentStyleObj: {
        height: ""
      }
    };
  },

  methods: {
    playerReadied(player) {
      player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options;
      };
    },
    setContentHeight() {
      let livehight = this.$refs.live.offsetHeight;
      this.contentStyleObj.height =
        window.innerHeight - (livehight + 44) + "px";
    }
  },
  mounted() {
    console.log("haha");
    console.log(this.$route.query);
    this.setContentHeight();
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

<template>
  <div class="live">
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

    <van-tabs v-model="active" animated title-active-color="#0084ff" color="#0084ff">
      <van-tab title="聊天室">
        <div class="content">
          <chat />
        </div>
      </van-tab>
      <van-tab title="现场图集">
        <div class="content">
          <image-total></image-total>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import "videojs-contrib-hls";
import { NoticeBar, Tab, Tabs } from "vant";
import chat from "./chat";
import imageTotal from "./imageTotal";
export default {
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
            src: "http://live.huobaowang.com/live/test.m3u8" //这是hls流
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
      active: 2
    };
  },

  methods: {
    playerReadied(player) {
      player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options;
      };
    }
  }
};
</script>

<style lang="less">
.live {
  width: 100%;
}
.noticebar {
  padding: 0px;
}
.content {
  height: 100%;
}
</style>

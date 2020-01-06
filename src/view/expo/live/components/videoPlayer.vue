<template>
  <div class="wrapper">
    <div v-if="!started">
      <img :src="banner" />
    </div>
    <div v-if="started">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        @ready="playerReadied"
      ></video-player>
      <div class="watch">
        <i class="iconfont icon-watch"></i>
        <span>{{hits}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import "videojs-contrib-hls";
export default {
  name: "VideoPlayer",
  props: {
    started: {
      default: false,
      type: Boolean
    },
    banner: {
      default: "",
      type: String
    },
    pullStreamAddress: {
      default: "",
      type: String
    },
    hits: {
      default: 0,
      type: Number
    }
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
            src: this.pullStreamAddress //这是hls流
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
        poster: this.banner // 你的封面地址
      }
    };
  },

  components: { videoPlayer },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    playerReadied(player) {
      player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options;
      };
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  position: relative;
  img {
    width: 100%;
  }
  .watch {
    position: absolute;
    top: 10px;
    right: 5px;
    color: white;
    padding-left: 5px;
    padding-right: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    font-size: 12px;
    text-align: center;
    height: 18px;
  }
}
</style>
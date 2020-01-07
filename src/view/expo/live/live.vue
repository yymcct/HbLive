<template>
  <div>
    <div v-show="showNavBar" ref="navBar">
      <van-nav-bar title="火爆直播" left-arrow @click-left="$router.push(`/expo/${meetingId}/live`)" />
    </div>

    <div class="live" ref="videoPlayer" v-show="topShow">
      <video-player :banner="live.banner" :hits="live.hits" />
    </div>

    <div class="desc" ref="desc">
      <div class="name">{{live.title}}</div>
      <div class="hits">
        <div class="hits-l">
          <span>{{live.hits}}</span> 人次观看
        </div>
        <div class="hits-r">
          <router-link :to="{ path:`/expo/${meetingId}` }">活动详情></router-link>
        </div>
      </div>
      <div class="time">
        <img :src="require('@/assets/images/zhibo/date.png')" />
        <span>{{live.beginTime}}</span>
      </div>
      <div class="time">
        <img :src="require('@/assets/images/zhibo/addr.png')" />
        <span>{{live.address}}</span>
      </div>
    </div>

    <div class="imgwall">
      <van-tabs v-model="active" animated title-active-color="#0084ff" color="#0084ff" swipeable>
        <template v-for="iteam in liveColumns">
          <van-tab :title="iteam.name" v-bind:key="iteam.id">
            <images-wall
              v-if="iteam.typeTypeInLiveBroadCast==0 || iteam.typeTypeInLiveBroadCast==1"
              :liveColumnId="iteam.id"
              :style="{height:tabContentHigh}"
              @scrollLiveTop="scrollLiveTop"
            ></images-wall>
          </van-tab>
        </template>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {
  api_GetLiveBroadCast,
  api_GetLiveBroadCastInfoType
} from "@/api/meetingApi";
import { mapGetters } from "vuex";
import VideoPlayer from "./components/videoPlayer";
import imagesWall from "./components/imagesWall";
export default {
  name: "Live",
  props: {
    pliveId: {
      default: 0,
      type: Number
    },
    showNavBar: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      meetingId: 0,
      liveId: 0,
      live: {
        banner: "",
        title: "",
        hits: 0,
        beginTime: "",
        address: ""
      },
      liveColumns: [],
      active: 0,
      tabContentHigh: "375px",
      timer: 0,
      topShow: true
    };
  },

  components: { VideoPlayer, imagesWall }, //

  computed: {
    ...mapGetters({
      meeting: "meeting/meeting"
    })
  },

  beforeMount() {},

  mounted() {
    this.meetingId = this.$route.params.meetingId;

    this.liveId =
      this.pliveId != 0 ? this.pliveId : this.$route.params.liveId;

    api_GetLiveBroadCast({
      Filters: `id==${this.liveId}`
    })
      .then(res => {
        this.live = res.result[0];
        return res.result[0];
      })
      .then(res => {
        console.log(res);
        return api_GetLiveBroadCastInfoType({
          LiveBroadCastId: res.id
        });
      })
      .then(res => {
        this.liveColumns = res.result;
      });

    this.timer = setInterval(() => {
      this.setContentHeight();
    }, 100);
  },

  methods: {
    setContentHeight() {
      let tmphight =
        window.innerHeight -
        this.$refs.navBar.offsetHeight -
        this.$refs.videoPlayer.offsetHeight -
        this.$refs.desc.offsetHeight -
        50 +
        "px";
      if (this.tabContentHigh != tmphight) {
        this.tabContentHigh = tmphight;
      }
    },
    scrollLiveTop(r) {
      this.topShow = r;
    }
  },

  watch: {},
  destroyed() {
    window.clearInterval(this.timer);
  }
};
</script>
<style lang='scss' scoped>
.desc {
  width: 95%;
  margin: 0 auto;
  padding-top: 5px;
  .name {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
  }
  .hits {
    font-size: 13px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .hits-l span {
      color: rgb(70, 206, 142);
    }
    .hits-r {
      color: #666;
    }
  }
  .time {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 6px 0;
    img {
      width: 15px;
      height: 15px;
      margin-right: 3px;
    }
    span {
      font-size: 13px;
      color: #333;
    }
  }
}
</style>
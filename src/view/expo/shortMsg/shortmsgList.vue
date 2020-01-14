<template>
  <div class="wrapper">
    <hb-layout :active="2">
      <scroll class="scroll" :data="shortMsg" pullup @scrollToEnd="scrollToEnd">
        <div class="top">
          <div v-if="userinfo " class="top-main">
            <span>{{userinfo.nick}}</span>
            <img :src="userinfo.photo" />
          </div>
          <div v-else class="bg"></div>
        </div>
        <div class="conlist">
          <template v-for="(item,index) in shortMsg">
            <shortMsg :key="index" :shortMsg="item" @imageClick="handImagePreview" />
          </template>
        </div>
        <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
      </scroll>
    </hb-layout>
    <div class="fabu" @click="postShortMsg">
      <img :src="require('@/assets/images/expo/post-white.png')" />
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import scroll from "@/components/scroll/scroll";
import hbLayout from "@/components/layout/hbLayout";
import { api_GetMeetingShortMsg, api_PostMeetingHits } from "@/api/meetingApi";
import shortMsg from "@/components/shortMsg/shortMsg";
export default {
  name: "expoShortmsg",
  props: [""],
  data() {
    return {
      shortMsg: [],
      page: 1,
      isEnd: false,
      userinfo: null,
      imagePreview: []
    };
  },

  components: {
    scroll,
    hbLayout,
    shortMsg
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getMeetingShortMsg();
    //  this.$globalFun.userInfoAPI.ifLogin(this.postMeetingHits, false);
    this.$globalFun.wxShare(location.href.split("#")[0], {
      title: `火爆云展动态`,
      desc: `火爆云展动态`,
      link: location.href,
      imgUrl: "https://m.1988.tv/images/bg.jpg",
      success: function() {}
    });
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getMeetingShortMsg();
      }
    },
    getMeetingShortMsg() {
      api_GetMeetingShortMsg({
        Filters: "TopicId!=0",
        Sorts: "-id",
        Page: this.page,
        PageSize: 10
      }).then(res => {
        if (res.result.length == 0) {
          this.isEnd = true;
        }
        this.shortMsg = this.shortMsg.concat(res.result);
        res.result.map(item => {
          this.imagePreview = this.imagePreview.concat(item.listPicture);
        });
      });
    },
    //点赞会议
    postMeetingHits() {
      api_PostMeetingHits({
        id: this.meetingId
      });
    },
    //发布动态
    postShortMsg() {
      this.$globalFun.userInfoAPI.ifLogin(() => {
        this.$router.push("/expo/shortmsg/post");
      });
    },
    handImagePreview(img) {
      let index = this.imagePreview.indexOf(img);
      ImagePreview({
        images: this.imagePreview,
        startPosition: index,
        showIndicators: true,
        onClose() {
          // do something
        }
      });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  background: #fff;

  .scroll {
    height: 100vh;
    .top {
      position: relative;
      width: 100%;
      height: 150px;
      background-size: 100% 100%;
      overflow: hidden;
      .bg {
        position: relative;
        width: 100%;
        height: 150px;
        background: url("https://m.1988.tv/images/bg.jpg") no-repeat;
        background-position: center;
        background-size: cover;
      }
      .top-main {
        position: absolute;
        right: 15px;
        bottom: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        span {
          font-size: 15px;
          font-weight: bold;
          color: #fff;
          margin-right: 10px;
        }
        img {
          width: 110px;
          height: 110px;
          border-radius: 5px;
        }
      }
    }

    .conlist {
      width: 90%;
      margin: 0 auto;
    }
  }
  .fabu {
    width: 50px;
    height: 50px;
    position: fixed;
    z-index: 9;
    right: 15px;
    bottom: 90px;
    background: #09bb07;
    border-radius: 50%;
    img {
      width: 30px;
      height: 30px;
      margin: 10px 10px;
    }
  }
}
</style>
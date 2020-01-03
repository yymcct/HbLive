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
            <div class="detail" :key="index">
              <div class="detail-top">
                <img class="detail-img" :src="item.addUserPhoto" />
                <div class="detail-left-center">
                  <div class="detail-title">{{item.addUserName}}</div>
                  <div class="detail-time">{{item.addTime}}</div>
                </div>
              </div>
              <div class="detail-con">
                <div class="detail-con-text">
                  <span class="des">{{item.content}}</span>
                </div>
                <div class="detail-con-pic" v-if="item.picture">
                  <img v-for="(url, index) in item.listPicture" :key="index" :src="url" />
                  <div class="more" v-if="item.listPicture.length>3">+ {{item.listPicture.length-3}}</div>
                </div>
                <div class="detail-con-pic" v-if="item.video">
                  <video :src="item.video" controls="false"></video>
                </div>
              </div>
              <div class="detail-bottom">
                <div class="detail-bottom-list">
                  <img :src="require('@/assets/images/expo/see.png')" />
                  <span>{{item.hits}}</span>
                </div>
                <div class="detail-bottom-list">
                  <img :src="require('@/assets/images/expo/pinglun.png')" />
                  <span>{{item.shareCount}}</span>
                </div>
                <div class="detail-bottom-list">
                  <img
                    :src=" item.isThumbsUp?require('@/assets/images/expo/zan1.png'):require('@/assets/images/expo/zan0.png') "
                  />
                  <span>{{item.thumbsUpCount}}</span>
                </div>
                <div class="detail-bottom-list">
                  <img :src="require('@/assets/images/expo/share1.png')" />
                  <button class="share">分享</button>
                </div>
              </div>
            </div>
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
import hbLayout from "@/components/layout/hbLayout";
import scroll from "@/components/scroll/scroll";
import { api_GetMeetingShortMsg, api_PostMeetingHits } from "@/api/meetingApi";
export default {
  name: "ShortMsgList",
  props: [""],
  data() {
    return {
      shortMsg: [],
      page: 1,
      isEnd: false,
      userinfo: null
    };
  },

  components: {
    scroll,
    hbLayout
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
        this.$router.push('/expo/shortmsg/post');
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
      .detail {
        display: flex;
        flex-direction: column;
        margin: 10px auto;
        background: #fff;
        .detail-top {
          width: 96%;
          display: flex;
          flex-flow: row;
          vertical-align: middle;
          align-items: center;
          margin: 0 auto;
          border-bottom: 1px #f3f3f3 solid;
          .detail-img {
            width: 44px;
            height: 44px;
            margin: 5px 10px;
            border-radius: 5px;
          }
          .detail-left-center {
            line-height: 29px;
            display: flex;
            flex-direction: column;
            vertical-align: middle;
            .detail-title {
              font-size: 15px;
              font-weight: bold;
              color: #000;
            }
            .detail-time {
              font-size: 12px;
              color: #888888;
            }
          }
        }
        .detail-con {
          width: 96%;
          margin: 10px auto;
          border-bottom: 1px #f3f3f3 solid;
          letter-spacing: 1px;
          .detail-con-text {
            font-size: 12px;
            font-family: Microsoft Yahei;
            width: 96%;
            margin: 0 auto;
            span {
              font-size: 15px;
              color: #000;
              white-space: pre-wrap;
              line-height: 22px;
            }
          }
          .detail-con-pic {
            display: flex;
            justify-content: flex-start;
            margin: 10px auto;
            img {
              width: 30%;
              height: 100px;
              margin-left: 2%;
            }
            .more {
              width: 29%;
              height: 100px;
              line-height: 100px;
              font-size: 21px;
              font-weight: bold;
              color: #fff;
              background: rgba(0, 0, 0, 0.5);
              text-align: center;
              position: absolute;
              left: 65%;
            }
          }
        }

        .detail-bottom {
          width: 90%;
          margin: 10px auto;
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          height: 20px;
          line-height: 20px;
          .detail-bottom-list {
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
              width: 14px;
              height: 14px;
            }
            span {
              font-size: 13px;
              color: #888888;
              margin-left: 5px;
            }
            button {
              background: #fff;
              font-size: 13px;
              color: #888888;
              padding-left: 5px;
              border: 0;
            }
          }
        }
      }
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
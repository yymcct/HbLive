<template>
  <div class="detail">
    <div class="detail-top">
      <img class="detail-img" :src="shortMsg.addUserPhoto" />
      <div class="detail-left-center">
        <div class="detail-title">{{shortMsg.addUserName}}</div>
        <div class="detail-time">{{shortMsg.addTime}}</div>
      </div>
    </div>
    <div class="detail-con">
      <div class="detail-con-text">
        <span class="des">{{shortMsg.content}}</span>
      </div>
      <div class="detail-con-pic" v-if="shortMsg.picture">
        <van-image
          class="pic"
          v-for="(url, index) in shortMsg.listPicture"
          :key="index"
          :src="url"
          @click="handImageClick(url)"
          fit="cover"
        />
        <div class="more" v-if="shortMsg.listPicture.length>3">+ {{shortMsg.listPicture.length-3}}</div>
      </div>
      <div class="detail-con-pic" v-if="shortMsg.video">
        <video :src="shortMsg.video" controls="false"></video>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="detail-bottom-list">
        <img :src="require('@/assets/images/expo/see.png')" />
        <span>{{shortMsg.hits}}</span>
      </div>
      <div class="detail-bottom-list">
        <img :src="require('@/assets/images/expo/pinglun.png')" />
        <span>{{shortMsg.shareCount}}</span>
      </div>
      <div class="detail-bottom-list">
        <img
          :src=" shortMsg.isThumbsUp?require('@/assets/images/expo/zan1.png'):require('@/assets/images/expo/zan0.png') "
        />
        <span>{{shortMsg.thumbsUpCount}}</span>
      </div>
      <div class="detail-bottom-list">
        <img :src="require('@/assets/images/expo/share1.png')" />
        <button class="share">分享</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShortMsg",
  props: {
    shortMsg: Object
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handImageClick(img){
      this.$emit("imageClick",img);
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
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
      .pic {
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
</style>
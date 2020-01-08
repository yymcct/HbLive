<template>
  <scroll
    class="scroll"
    :style="{ height: scrollHeight}"
    :data="shortMsg"
    pullup
    @scrollToEnd="scrollToEnd"
  >
    <div class="detail" v-for="(item,index) in reply" :key="index">
      <div class="detail-top">
        <img class="detail-img" :src="item.addUserPhoto" mode="aspectFit" />
        <div class="detail-left-center">
          <div class="detail-title">{{item.addUserName}}</div>
          <div class="detail-time">{{item.addTime}}</div>
        </div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="title">{{item.contentDtos.name}}</div>
    </div>
  </scroll>
</template>

<script>
import scroll from "@/components/scroll/scroll";
import { api_GetMemberReplyReply } from "@/api/meetingApi";
export default {
  name: "Reply",
  props: [""],
  data() {
    return {
      reply: [],
      page: 1,
      isEnd: false
    };
  },

  components: { scroll },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getReply();
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getReply();
      }
    },
    getReply() {
      api_GetMemberReplyReply({
        Filters: "",
        Sorts: "-id",
        Page: this.page,
        PageSize: 10
      }).then(res => {
        if (res.result.length == 0) {
          this.isEnd = true;
        }
        this.reply = this.reply.concat(res.result);
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.scroll {
  .detail {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 5px auto;
    background: #fff;
    .detail-top {
      width: 96%;
      display: flex;
      flex-flow: row;
      vertical-align: middle;
      margin: 0 auto;
      border-bottom: 1px #f3f3f3 solid;
      .detail-img {
        width: 44px;
        height: 44px;
        margin: 5px 10px;
        border-radius: 50%;
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
    .content {
      margin: 20px 20px 20px 65px;
      font-size: 15px;
    }
    .title {
      background: #f3f3f3;
      margin: auto 10px 10px 65px;
      font-size: 13px;
      color: #888;
      padding: 10px;
      border-radius: 5px;
    }
  }
}
</style>
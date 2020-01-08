<template>
  <!-- 我的评论 -->
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.push(`/expo/${meetingId}/user`)"
      />
    </div>
    <div class="content">
      <div class="menu">
        <span :class="{ active: replyIsActive}" @click="replyIsActive=true">我的评论</span>
        <span :class="{ active: !replyIsActive}" @click="replyIsActive=false">回复我的</span>
      </div>
      <div class="box">
        <reply v-show="replyIsActive" />
        <reply-reply v-show="!replyIsActive" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import reply from "./components/comment/reply";
import replyReply from "./components/comment/replyReply";
export default {
  name: "Comment",

  data() {
    return {
      replyIsActive: true
    };
  },

  components: {
    reply,
    replyReply
  },

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  }
};
</script>
<style lang='scss' scoped>
.wrapper {
  .content {
    .menu {
      width: 100%;
      height: 50px;
      background: #fff;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px #f3f3f3 solid;
      .active {
        color: #09bb07;
      }
      span {
        width: 50%;
        text-align: center;
        font-size: 15px;
        border-right: 1px #f3f3f3 solid;
      }
    }
  }
  .box{
    margin-top: 10px;
  }
}
</style>
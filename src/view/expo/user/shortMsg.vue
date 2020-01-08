<template>
  <!-- 我的动态 -->
  <div class="wapper">
    <div class="bar" ref="bar">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.push(`/expo/${meetingId}/user`)"
      />
    </div>
    <div class="msgs">
      <scroll
        class="scroll"
        :style="{ height: scrollHeight}"
        :data="shortMsg"
        pullup
        @scrollToEnd="scrollToEnd"
      >
        <div class="conlist">
          <template v-for="(item,index) in shortMsg">
            <shortMsg :key="index" :shortMsg="item" @imageClick="handImagePreview" />
          </template>
        </div>
        <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ImagePreview } from "vant";
import scroll from "@/components/scroll/scroll";
import { api_GetMeetingShortMsg } from "@/api/meetingApi";
import shortMsg from "@/components/shortMsg/shortMsg";
export default {
  name: "MyShortMsg",
  props: [""],
  data() {
    return {
      shortMsg: [],
      page: 1,
      isEnd: false,
      imagePreview: [],
      scrollHeight: "375px"
    };
  },

  components: {
    scroll,
    shortMsg
  },

  computed: {
    ...mapGetters({
      meetingId: "meeting/meetingId",
      user: "user/user"
    })
  },

  beforeMount() {},

  mounted() {
    this.getShortMsg();
    this.setScrollHeight();
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getShortMsg();
      }
    },
    getShortMsg() {
      api_GetMeetingShortMsg({
        Filters: "AddUserId==" + this.user.id,
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
    },
    setScrollHeight() {
      this.scrollHeight =
        window.innerHeight - this.$refs.bar.offsetHeight + "px";
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  background: #fff;
  .scroll {
    overflow: hidden;
    .conlist {
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
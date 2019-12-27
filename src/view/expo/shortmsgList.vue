<template>
  <div>
    <hb-layout :active="2">
      <scroll class="scroll" :data="shortMsg" pullup @scrollToEnd="scrollToEnd">
        <div></div>
        <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
      </scroll>
    </hb-layout>
  </div>
</template>

<script>
import hbLayout from "@/components/layout/hbLayout";
import { api_GetMeetingShortMsg, api_PostMeetingHits } from "@/api/meetingApi";
export default {
  name: "",
  props: [""],
  data() {
    return {
      shortMsg: [],
      page: 1,
      isEnd: false
    };
  },

  components: {
    hbLayout
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getMeetingShortMsg();
    this.postMeetingHits();
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
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>
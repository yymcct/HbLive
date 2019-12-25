<template>
  <div class="wapper">
    <scroll
      class="scroll"
      :data="companys"
      pullup
      @scrollToEnd="scrollToEnd"
      listenScroll
      @scroll="scroll"
    >
      <company :companys="companys"></company>
      <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/scroll/scroll";
import { api_GetMeetingAreaCompany } from "@/api/meetingApi";
import company from "@/components/expo/company";
export default {
  name: "reaCompany",
  props: {
    meetingAreaId: Number
  },
  data() {
    return {
      companys: [],
      page: 1,
      isEnd: false
    };
  },

  components: {
    scroll,
    company
  },

  mounted() {
    this.getMeetingAreaCompanys();
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getMeetingAreaCompanys();
      }
    },
    scroll(x, y) {
      console.log(x);
      console.log(y);
    },
    getMeetingAreaCompanys() {
      api_GetMeetingAreaCompany({
        Filters: "MeetingAreaId==" + this.meetingAreaId,
        Sorts: "-id",
        Page: this.page,
        PageSize: 20
      }).then(res => {
        if (res.result.length == 0) {
          this.isEnd = true;
        }
        this.companys = this.companys.concat(res.result);
      });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wapper {
  height: 100%;
  .scroll {
    height: 100%;
  }
  .nomore {
    color: #666;
    text-align: center;
    font-size: 13px;
    margin: 10px;
  }
}
</style>
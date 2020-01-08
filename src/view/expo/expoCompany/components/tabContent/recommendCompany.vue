<template>
  <div class="wapper">
    <scroll
      class="scroll"
      :data="companys"
      pullup
      @scrollToEnd="scrollToEnd"
      listenScroll
      @scroll="scroll"
      :probeType="probeType"
    >
      <company :companys="companys" :meetingId="meetingId" showTop></company>
      <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/scroll/scroll";
import { api_GetGetCompanyByRecommend } from "@/api/meetingApi";
import company from "./company";
export default {
  name: "reaCompany",
  props: {
    meetingId: Number
  },
  data() {
    return {
      probeType: 2,
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
    scroll(p) {
      if (p.y < -50) {
        this.$emit("scrollLiveTop", false);
      }
      if (p.y > 0) {
        this.$emit("scrollLiveTop", true);
      }
    },
    getMeetingAreaCompanys() {
      api_GetGetCompanyByRecommend({
        Filters: "meetingID==" + this.meetingId,
        Sorts: "",
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
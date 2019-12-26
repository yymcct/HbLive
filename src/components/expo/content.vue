<template>
  <div class="wapper">
    <van-tabs v-model="active" animated title-active-color="#06a65e" color="#06a65e" swipeable>
      <van-tab title="推荐" class="tab">
        <recommend-company
          :meetingId="meetingId"
          class="company"
          :style="{height:height}"
          @scrollLiveTop="scrollLiveTop"
        ></recommend-company>
      </van-tab>
      <template v-for="iteam in meetingTypes">
        <van-tab :title="iteam.name" v-bind:key="iteam.id" class="tab">
          <area-company
            :meetingId="meetingId"
            :meetingAreaId="iteam.id"
            class="company"
            :style="{height:height}"
            @scrollLiveTop="scrollLiveTop"
          ></area-company>
        </van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { api_GetMeetingArea } from "@/api/meetingApi";
import areaCompany from "@/components/expo/content/areaCompany";
import recommendCompany from "@/components/expo/content/recommendCompany";
export default {
  name: "ExpoContent",
  props: {
    meetingId: Number,
    height: String
  },
  data() {
    return {
      active: 0,
      meetingTypes: []
    };
  },

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    areaCompany,
    recommendCompany
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getMeetingArea();
  },

  methods: {
    getMeetingArea() {
      api_GetMeetingArea({ meetingId: this.meetingId }).then(res => {
        this.meetingTypes = res.result;
      });
    },
    scrollLiveTop(r) {
      this.$emit("scrollLiveTop", r);
    }
  },

  watch: {
    meetingId: function() {
      this.getMeetingArea();
    }
  }
};
</script>
<style lang='scss' scoped>
.wapper {
  height: 100%;
  .tab {
    height: 100%;
  }
  .company {
    overflow: hidden;
  }
}
</style>
<template>
  <div class="wapper">
    <van-tabs v-model="active" animated title-active-color="#0084ff" color="#0084ff" swipeable>
      <template v-for="iteam in meetingTypes">
        <van-tab :title="iteam.name" v-bind:key="iteam.id" class="tab">
          <area-company :meetingAreaId="iteam.id" class="company" :style="{height:height}"></area-company>
        </van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { api_GetMeetingArea } from "@/api/meetingApi";
import areaCompany from "@/components/expo/areaCompany";
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
    areaCompany
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
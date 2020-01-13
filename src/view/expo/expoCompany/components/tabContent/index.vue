<template>
  <div class="wapper">
    <van-tabs v-model="active" animated title-active-color="#06a65e" color="#06a65e" swipeable>
      <van-tab title="推荐" class="tab">
        <recommend-company       
          class="company"
          :style="{height:height}"
          @scrollLiveTop="scrollLiveTop"
        ></recommend-company>
      </van-tab>
      <template v-for="iteam in meetingTypes">
        <van-tab :title="iteam.name" v-bind:key="iteam.id" class="tab">
          <area-company
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
import { mapGetters } from "vuex";
import { api_GetMeetingArea } from "@/api/meetingApi";
import areaCompany from "./areaCompany";
import recommendCompany from "./recommendCompany";
export default {
  name: "ExpoContent",
  props: {
    height: String
  },
  data() {
    return {
      active: 0,
      meetingTypes: []
    };
  },

  components: {
    areaCompany,
    recommendCompany
  },

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },

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
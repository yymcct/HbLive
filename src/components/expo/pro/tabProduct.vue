<template>
  <div class="wapper">
    <van-tabs v-model="active" animated title-active-color="#06a65e" color="#06a65e" swipeable>
      <van-tab title="推荐" class="tab">
        <recommend-product
          :meetingId="meetingId"
          class="product"
          :style="{height:height}"
          @scrollLiveTop="scrollLiveTop"
        ></recommend-product>
      </van-tab>
      <template v-for="iteam in meetingTypes">
        <van-tab :title="iteam.name" v-bind:key="iteam.id" class="tab">
          <area-product
            :meetingAreaId="iteam.id"
            :meetingId="meetingId"
            class="product"
            :style="{height:height}"
            @scrollLiveTop="scrollLiveTop"
          ></area-product>
        </van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { api_GetMeetingArea } from "@/api/meetingApi";
import areaProduct from "@/components/expo/pro/areaProduct";
import recommendProduct from "@/components/expo/pro/recommendProduct";
export default {
  name: "TabContent",
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
    areaProduct,
    recommendProduct
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
  .product {
    overflow: hidden;
  }
}
</style>
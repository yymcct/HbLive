 <template>
  <div>
    <hb-layout :active="0">
      <div class="box">
        <div ref="expotop" v-show="topShow">
          <expo-top :meetingId="meetingId"></expo-top>
        </div>

        <div ref="toptuijian" >
          <top-tuijian :meetingId="meetingId"></top-tuijian>
        </div>
        <div>
          <expo-content
            :meetingId="meetingId"
            :height="contentStyleObj.height"
            @scrollLiveTop="scrollLiveTop"
          ></expo-content>
        </div>
      </div>
    </hb-layout>
  </div>
</template>

<script>
import HbLayout from "@/components/layout/hbLayout";
import ExpoTop from "@/components/expo/top";
import TopTuijian from "@/components/expo/topTuijian";
import ExpoContent from "@/components/expo/content";
import { Tab, Tabs } from "vant";
export default {
  name: "ExpoIndex",
  props: {},
  data() {
    return {
      meetingId: 1,
      contentStyleObj: {
        height: "370px"
      },
      topShow: true,
      timer: 0
    };
  },

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    HbLayout,
    ExpoTop,
    TopTuijian,
    ExpoContent
  },

 
  mounted() {
    this.meetingId = 1;
    this.timer = setInterval(() => {
      this.setContentHeight();
    }, 100);
  },

  methods: {
    setContentHeight() {
      let expotopHight = this.$refs.expotop.offsetHeight;
      let toptuijianHight = this.$refs.toptuijian.offsetHeight;
      let tmphight =
        window.innerHeight - expotopHight - toptuijianHight - 50 + "px";
      if (this.contentStyleObj.height != tmphight) {
        this.contentStyleObj.height = tmphight;
      }
    },
    scrollLiveTop(r) {
      this.topShow = r;
    }
  },

  watch: {
    $route() {
      this.meetingId = this.$route.params.id;
    }
  },
  destroyed() {
    window.clearInterval(this.timer);
  }
};
</script>
<style lang='scss' scoped>
</style>
 <template>
  <div>
    <hb-layout :active="0">
      <div class="box">
        <div ref="mexpotop" v-show="topShow">
          <expo-top :meetingId="meetingId"></expo-top>
        </div>

        <div ref="mtoptuijian" @click="test">
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
      topShow: true
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

  computed: {},

  beforeMount() {},

  mounted() {
    this.meetingId = 1;
    setInterval(() => {
      this.setContentHeight();
    }, 500);
  },

  methods: {
    setContentHeight() {
      var expotopHight = this.$refs.mexpotop.offsetHeight;
      var toptuijianHight = this.$refs.mtoptuijian.offsetHeight;
      var tmphight =
        window.innerHeight - expotopHight - toptuijianHight - 50 + "px";
      // console.log(expotopHight);
      //console.log(toptuijianHight);
      if (this.contentStyleObj.height != tmphight) {
        this.contentStyleObj.height = tmphight;
      }
    },
    scrollLiveTop(r) {
      this.topShow = r;
    },
    test() {
      this.topShow = !this.topShow;
    }
  },

  watch: {
    $route() {
      this.meetingId = this.$route.params.id;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
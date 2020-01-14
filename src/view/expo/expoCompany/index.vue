 <template>
  <!-- 展商名录 -->
  <div>
    <hb-layout :active="0">
      <div class="box">
        <div ref="expotop" v-show="topShow">
          <expo-top />
        </div>
        <div ref="toptuijian">
          <top-tuijian />
        </div>
        <div>
          <expo-content :height="contentStyleObj.height" @scrollLiveTop="scrollLiveTop"></expo-content>
        </div>
        <new-addition class="piaofu-1" />
      </div>
    </hb-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ExpoTop from "./components/top";
import TopTuijian from "./components/topTuijian";
import ExpoContent from "./components/tabContent/index";
import HbLayout from "@/components/layout/hbLayout";
import newAddition from "@/components/expo/newAddition";

export default {
  name: "expoCompany",
  props: {},
  data() {
    return {
      contentStyleObj: {
        height: "370px"
      },
      topShow: true,
      timer: 0
    };
  },

  components: {
    HbLayout,
    ExpoTop,
    TopTuijian,
    ExpoContent,
    newAddition
  },
  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },
  mounted() {
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

  destroyed() {
    window.clearInterval(this.timer);
  }
};
</script>
<style lang='scss' scoped>
.box {
  .piaofu-1 {
    position: fixed;
    left: 1%;
    bottom: 90px;
  }
}
</style>
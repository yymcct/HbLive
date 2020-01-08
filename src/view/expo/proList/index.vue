 <template>
  <div>
    <hb-layout :active="1">
      <div class="box">
        <div ref="expotop" v-show="topShow">
          <expo-top :meetingId="meetingId"></expo-top>
        </div>
        <div>
          <tab-product
            :meetingId="meetingId"
            :height="contentStyleObj.height"
            @scrollLiveTop="scrollLiveTop"
          ></tab-product>
        </div>
      </div>
    </hb-layout>
  </div>
</template>

<script>
import HbLayout from "@/components/layout/hbLayout";
import ExpoTop from "@/components/expo/top";
import tabProduct from "@/components/expo/pro/tabProduct";
import { Tab, Tabs } from "vant";
export default {
  name: "ExpoPro",
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
    tabProduct
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.meetingId = 1;
    this.timer = setInterval(() => {
      this.setContentHeight();
    }, 100);
  },

  methods: {
    setContentHeight() {
      let expotopHight = this.$refs.expotop.offsetHeight;
      let tmphight = window.innerHeight - expotopHight - 50 + "px";
      if (this.contentStyleObj.height != tmphight) {
        this.contentStyleObj.height = tmphight;
      }
    },
    scrollLiveTop(r) {
      this.topShow = r;
    },
  },

  watch: {
    $route() {
      this.meetingId = this.$route.params.meetingId;
    }
  },
  destroyed() {
    window.clearInterval(this.timer);
  }
};
</script>
<style lang='scss' scoped>
</style>
 <template>
  <div>
    <hb-layout :active="1">
      <div class="box">
        <div ref="mexpotop" v-show="topShow">
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
      topShow: true
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
    setInterval(() => {
      this.setContentHeight();
    }, 500);
  },

  methods: {
    setContentHeight() {
      var expotopHight = this.$refs.mexpotop.offsetHeight;
      var tmphight =
        window.innerHeight - expotopHight  - 50 + "px";
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
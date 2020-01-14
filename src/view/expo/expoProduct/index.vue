 <template>
  <div>
    <hb-layout :active="1">
      <div class="box">
        <div ref="expotop" v-show="topShow">
          <expo-top />
        </div>
        <div>
          <tab-product :height="contentStyleObj.height" @scrollLiveTop="scrollLiveTop"></tab-product>
        </div>
      </div>
    </hb-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HbLayout from "@/components/layout/hbLayout";
import ExpoTop from "../expoCompany/components/top";
import tabProduct from "./components/tabContent/index";

export default {
  name: "expoProduct",
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
    tabProduct
  },

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },

  beforeMount() {},

  mounted() {
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
    }
  },
  destroyed() {
    window.clearInterval(this.timer);
  }
};
</script>
<style lang='scss' scoped>
</style>
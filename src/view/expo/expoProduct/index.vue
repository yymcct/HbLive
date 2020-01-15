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
        <new-addition class="piaofu-1" />
      </div>
    </hb-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HbLayout from "@/components/layout/hbLayout";
import ExpoTop from "../expoCompany/components/top";
import tabProduct from "./components/tabContent/index";
import newAddition from "@/components/expo/newAddition";
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
    tabProduct,
    newAddition
  },

  computed: {
    ...mapGetters({
      meetingId: "meeting/meetingId",
      meeting: "meeting/meeting",
      user: "user/user"
    })
  },

  beforeMount() {},

  mounted() {
    this.timer = setInterval(() => {
      this.setContentHeight();
    }, 100);

    this.wxShare();
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
    wxShare() {
      if (this.meeting == null) {
        setTimeout(() => {
          this.wxShare();
        }, 500);
      } else {
        const meeting = this.meeting;
        console.log("weixin", meeting);
        this.$globalFun.wxShare(location.href.split("#")[0], {
          title: meeting.sortName + this.$route.meta.title,
          desc: `${meeting.beginDate}至${meeting.endDate.substr(8, 2)}日,${
            meeting.address
          }`,
          link: location.href,
          imgUrl: meeting.wxSharePicture
            ? meeting.wxSharePicture
            : meeting.banner,
          success: function() {}
        });
      }
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
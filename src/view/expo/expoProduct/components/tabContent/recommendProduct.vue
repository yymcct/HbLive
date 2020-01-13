<template>
  <div class="wapper">
    <scroll
      class="scroll"
      :data="products"
      pullup
      @scrollToEnd="scrollToEnd"
      listenScroll
      @scroll="scroll"
      :probeType="probeType"
    >
      <product :products="products" :meetingId="meetingId" showTop></product>
      <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import scroll from "@/components/scroll/scroll";
import { api_GetProductByRecommend } from "@/api/meetingApi";
import product from "./product";
export default {
  name: "reaCompany",

  data() {
    return {
      probeType: 2,
      products: [],
      page: 1,
      isEnd: false
    };
  },

  components: {
    scroll,
    product
  },

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },
  created() {},
  mounted() {
    this.getProductByRecommend();
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getProductByRecommend();
      }
    },
    scroll(p) {
      if (p.y < -50) {
        this.$emit("scrollLiveTop", false);
      }
      if (p.y > 0) {
        this.$emit("scrollLiveTop", true);
      }
    },
    getProductByRecommend() {
      api_GetProductByRecommend({
        Filters: "ProMeetingID==" + this.meetingId,
        Sorts: "",
        Page: this.page,
        PageSize: 10
      }).then(res => {
        if (res.result.length == 0) {
          this.isEnd = true;
        }
        this.products = this.products.concat(res.result);
      });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wapper {
  height: 100%;
  .scroll {
    height: 100%;
  }
  .nomore {
    color: #666;
    text-align: center;
    font-size: 13px;
    margin: 10px;
  }
}
</style>
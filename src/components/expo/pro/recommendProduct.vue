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
import scroll from "@/components/scroll/scroll";
import { api_GetProductByRecommend } from "@/api/meetingApi";
import product from "@/components/expo/pro/product";
export default {
  name: "reaCompany",
  props: {
    meetingId: Number
  },
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
  created() {this.getProductByRecommend();},
  mounted() {
    
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
        PageSize: 20
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
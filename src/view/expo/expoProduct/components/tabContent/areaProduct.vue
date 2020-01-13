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
      <product :products="products"></product>
      <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import scroll from "@/components/scroll/scroll";
import { api_GetMeetingAreaProduct } from "@/api/meetingApi";
import product from "./product";
export default {
  name: "AreaProduct",
  props: {
    meetingAreaId: Number
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
  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },
  mounted() {
    this.getMeetingAreaProduct();
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getMeetingAreaProduct();
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
    getMeetingAreaProduct() {
      api_GetMeetingAreaProduct({
        Filters: `ProMeetingID==${this.meetingId},ProMeetingAreaID==${this.meetingAreaId}`,
        Sorts: "-id",
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
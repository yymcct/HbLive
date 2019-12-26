<template>
  <div>heheh</div>
</template>

<script>
import {
  api_PostCompanyMemberHits,
  api_GetProductContent,
  api_GetCompanyContent,
  api_GetProductReplys,
  api_GetCompanyOtherProduct,
  api_PostMeetingHits
} from "@/api/meetingApi";
export default {
  name: "",
  props: [""],
  data() {
    return {
      meetingId: 0,
      productId: 0,
      product: null,
      company: null,
      liuyan: [], //产品评论
      prolist: [] //其他产品
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    // 点赞
    postCompanyMemberHits() {
      api_PostCompanyMemberHits({
        meetingId: this.meetingId,
        id: this.productId
      });
    },
    //获取产品详情
    getProductContent() {
      api_GetProductContent({
        meetingId: this.meetingId,
        id: this.productId
      }).then(res => {
        this.product = res.result;
      });
    },
    // 获取公司详情
    getCompanyContent() {
      api_GetCompanyContent({
        meetingId: this.meetingId,
        Id: this.product.companyId
      }).then(res => {
        this.company = res.result;
      });
    },
    // 产品评论
    getProductReplys() {
      api_GetProductReplys({
        Filters: "productid==" + this.productId,
        sorts: "-addTime",
        page: 1,
        pagesize: 50
      }).then(res => {
        this.liuyan = res.result;
      });
    },
    // 获取公司其他产品
    getCompanyOtherProduct() {
      api_GetCompanyOtherProduct({
        meetingId: this.meetingId,
        Id: this.productid
      }).then(res => {
        this.prolist = res.result;
      });
    },
    //点赞会议
    postMeetingHits() {
      api_PostMeetingHits({
        id: this.meetingId
      });
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>
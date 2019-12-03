<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <div class="conimge" v-for="item in imageData" v-bind:key="item">
        <!-- <img :src="item" /> -->
        <van-image width="100%" height="100%" fit="cover" :src="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { api_GetLiveBroadCastInfo } from "@/api/api";
import { Image } from "vant";
import BScroll from "better-scroll";
export default {
  name: "imageTotal",
  components: {
    [Image.name]: Image
  },

  data() {
    return {
      requestParams: {
        page: 1,
        pageSize: 10,
        filters: "LiveBroadCastId==2",
        sorts: "-id"
      },
      imageData: []
    };
  },
  methods: {
    GetData() {
      //this.listLoading = true;
      api_GetLiveBroadCastInfo(this.requestParams).then(respone => {

        respone.result.forEach(element => {
          this.imageData = element.listPicture.concat(this.imageData);
        });

        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {});
        });
      });
    }
  },
  created() {
    this.GetData();
  },
  mounted() {}
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.conimge {
  width: 33.33%;
  height: 33.33vw;
  padding: 2px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.wrapper {
  width: 100%;
  height: 373px;
}
/* img {
  width: 100%;
  height: 100%;
} */
</style>

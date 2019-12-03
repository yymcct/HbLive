<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <div class="conimge" v-for="item in imageData" v-bind:key="item">
        <!-- <img :src="item" /> -->
        <van-image width="100" height="100"  src="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { api_GetLiveBroadCastInfo } from "@/api/api";
import { Image  } from "vant";
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
        // this.listLoading = false;
        respone.result.forEach(element => {
          this.imageData = element.listPicture.concat(this.imageData);
        });
      });
    }
  },
  created() {
    this.GetData();
  }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.conimge {
  width: 33.33%;
  height: 33.33vw;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
}
</style>

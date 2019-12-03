<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <div class="conimge" v-for="(item, index) in imageData" v-bind:key="index">
        <!-- <img :src="item" /> -->
        <van-image width="100%" height="100%" fit="cover" :src="item" @click="handImgClick(index)" />
      </div>
    </div>
  </div>
</template>

<script>
import { api_GetLiveBroadCastInfo } from "@/api/api";
import { Image, ImagePreview } from "vant";
import Bscroll from "better-scroll";
export default {
  name: "imageTotal",
  components: {
    [Image.name]: Image,
    [ImagePreview.name]: ImagePreview
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
    handImgClick(index) {
      ImagePreview({
        images: this.imageData,
        startPosition: index,
        onClose() {
          // do something
        }
      });
    },
    loadData() {
      //this.listLoading = true;
      api_GetLiveBroadCastInfo(this.requestParams).then(respone => {
        respone.result.forEach(element => {
          this.imageData = element.listPicture.concat(this.imageData);
        });
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.wrapper, {
              scrollY: true,
              scrollX: false,
              mouseWheel: true,
              click: true,
              taps: true
            });
            this.scroll.on("touchend", pos => {
              // 下拉动作
              if (pos.y > 50) {
                this.loadData();
              }
            });
          } else {
            this.scroll.refresh();
          }
        });
      });
    }
  },
  created() {
    this.loadData();
  },
  mounted() {}
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  height: 100%;
}
/* img {
  width: 100%;
  height: 100%;
} */
</style>

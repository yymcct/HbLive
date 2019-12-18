<template>
  <div class="wapper">
    <scroll class="scroll" :data="lives" pullup @scrollToEnd="scrollToEnd">
      <template v-for="iteam in images">
        <div class="images-group" :key="iteam.id">
          <div
            v-bind:class="{'group-one':iteam.pictures.length==1,'group-two':iteam.pictures.length==2, 'group-three':iteam.pictures.length==3}"
          >
            <div v-for="(img, index) in iteam.pictures" :key="index">
              <img :src="img" />
            </div>
          </div>
          <p v-if="iteam.content">{{iteam.content}}</p>
        </div>
      </template>     
      <div class="nomore" v-show="images.length==0 || isEnd">---&nbsp;没有更多&nbsp;---</div>
    </scroll>
  </div>
</template>

<script>
import { api_GetHbLiveLiveColumnContent } from "@/api/api";
import scroll from "@/base/scroll/scroll";
export default {
  name: "ImagesWall",
  data() {
    return {
      images: [],
      page: 1,
      isEnd: false
    };
  },
  props: {
    liveColumnId: Number
  },
  components: { scroll },

  mounted() {
    this.getDataByPage(this.page);
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getDataByPage(this.page);
      }
    },
    getDataByPage(page) {
      api_GetHbLiveLiveColumnContent({
        page: page,
        pageSize: 30,
        filters: `HbLive_LiveColumnId==${this.liveColumnId}`,
        sorts: "id"
      }).then(res => {
        this.images = this.images.concat(res.result);
        if (this.images.length >= res.total) {
          this.isEnd = true;
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.wapper {
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .images-group {
      .group-two {
        display: flex;
        div {
          width: 50%;
          padding: 2px;
          img {
            width: 100%;
          }
        }
      }
      .group-three {
        display: flex;
        div {
          width: 33.33%;
          padding: 2px;
          img {
            width: 100%;
          }
        }
      }
      p {
        text-indent: 2em;
        margin-bottom: 10px;
      }
    }
// 
    .nomore {
      color: #666;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 50px;
    }
  }
}
</style>
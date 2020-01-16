<template>
  <div class="wapper">
    <scroll class="scroll" :data="lives" pullup @scrollToEnd="scrollToEnd">
      <div class="content">
        <div v-html="htmlContent"></div>
         <div class="nomore">---&nbsp;没有更多&nbsp;---</div>
      </div>     
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
      htmlContent: ""
    };
  },
  props: {
    liveColumnId: Number
  },
  components: { scroll },

  mounted() {
    this.getDataByPage();
  },

  methods: {
    getDataByPage() {
      api_GetHbLiveLiveColumnContent({
        page: 1,
        pageSize: 10,
        filters: `HbLive_LiveColumnId==${this.liveColumnId}`,
        sorts: "id"
      }).then(res => {
        if (res.result.length > 0) {
          this.htmlContent = res.result[0].content;
        }
      });
    }
  }
};
</script>
<style scoped>
.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content >>> p {
  margin: 0px;
  padding: 0px;
}
.content >>> img {
  width: 100%;
  display: block;
}
</style>
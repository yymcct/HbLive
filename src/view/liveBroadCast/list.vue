<template>
  <div class="wapper">
    <div v-for="iteam in liveBroadCasts" :key="iteam.id" class="iteam">
      <!-- <img src alt /> -->
      <div class="iteam-banner" style="height:100%;">
        <img :src="iteam.banner" />
        <div class="watch">
          <i class="iconfont icon-watch"></i>
          {{iteam.hits}}
        </div>
      </div>
      <p>{{iteam.title}}</p>
    </div>
  </div>
</template>

<script>
import { api_GetLiveBroadCast } from "@/api/api";
export default {
  name: "liveBroadCast",
  props: [""],
  data() {
    return {
      liveBroadCasts: []
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    api_GetLiveBroadCast({
      Sorts: "-id",
      Page: 1,
      PageSize: 10
    }).then(res => {
      this.liveBroadCasts = res.result;
    });
  },

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.wapper {
  .iteam {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    .iteam-banner {
      position: relative;
      img {
        width: 100%;
      }
      .watch {
        position: absolute;
        bottom: 3px;
        right: 0px;
        color: white;
        padding-left: 10px;
        padding-right: 10px;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
    p {
      margin-top: 5px;
      color: #333;
    }
  }
}
</style>
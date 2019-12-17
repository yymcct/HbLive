<template>
  <div class="wapper">
    <scroll
      class="scroll"
      :data="liveBroadCasts"
      pullup
      @scrollToEnd="scrollToEnd"
      pulldown
      @pulldown="pulldown"
    >
      <div v-for="iteam in liveBroadCasts" :key="iteam.id" class="iteam">
        <router-link :to="{name: 'live', params: {id: iteam.id }}">
          <!-- <img src alt /> -->
          <div class="iteam-banner" style="height:100%;">
            <img :src="iteam.banner" />
            <div class="watch">
              <i class="iconfont icon-watch"></i>
              {{iteam.hits}}
            </div>
          </div>
          <p>{{iteam.title}}</p>
        </router-link>
      </div>
    </scroll>
  </div>
</template>

<script>
import { api_GetLiveBroadCast } from "@/api/api";
import scroll from "@/base/scroll/scroll";
export default {
  name: "liveBroadCast",
  props: [""],
  data() {
    return {
      liveBroadCasts: [],
      page: 1
    };
  },

  components: { scroll },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getDataByPage(this.page);
  },

  methods: {
    // 上拉加载
    scrollToEnd() {
      this.page++;
      this.getDataByPage(this.page);
    },
    // 下拉刷新
    pulldown() {
      // this.page = 1;
      // this.liveBroadCasts = [];
      // this.getDataByPage(this.page);
    },
    getDataByPage(page) {
      api_GetLiveBroadCast({
        page: page,
        pageSize: 10,
        filters: "",
        sorts: "-id"
      }).then(res => {
        this.liveBroadCasts = this.liveBroadCasts.concat(res.result);
      });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wapper {
  .scroll {
    width: 100%;
    height: 100vh;
    overflow: hidden;
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
}
</style>
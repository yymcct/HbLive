<template>
  <div class="wapper">
    <scroll class="scroll" :data="lives" pullup @scrollToEnd="scrollToEnd">
      <div v-for="iteam in lives" :key="iteam.id" class="iteam">
        <div class="iteam-banner" style="height:100%;" @click="gotoLive(iteam.id)">
          <img :src="iteam.banner" />
          <div class="watch">
            <i class="iconfont icon-watch"></i>
            {{iteam.hits}}
          </div>
        </div>
        <p>{{iteam.title}}</p>
      </div>
      <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
    </scroll>
  </div>
</template>

<script>
import { api_GetLives } from "@/api/api";
import scroll from "@/base/scroll/scroll";
export default {
  name: "lives",
  data() {
    return {
      lives: [],
      page: 1,
      isEnd: false
    };
  },

  components: { scroll },

  mounted() {
    this.getDataByPage(this.page);
  },

  methods: {
    gotoLive(id) {
      this.$router.push("/live/" + id);
    },
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getDataByPage(this.page);
      }
    },
    getDataByPage(page) {
      api_GetLives({
        page: page,
        pageSize: 10,
        filters: "",
        sorts: "-id"
      }).then(res => {
        this.lives = this.lives.concat(res.result);
        if (this.lives.length >= res.total) {
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
    .nomore {
      color: #666;
      text-align: center;
      margin: 20px;
    }
  }
}
</style>
<template>
  <!-- 我的足迹 -->
  <div class="wapper">
    <div class="bar" ref="bar">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.push(`/expo/${meetingId}/user`)"
      />
    </div>
    <div>
      <scroll
        class="scroll"
        :style="{ height: scrollHeight}"
        :data="footMark"
        pullup
        @scrollToEnd="scrollToEnd"
      >
        <div class="con" v-for="(item, index) in foot" :key="index">
          <div class="con-r">
            <div class="con-r-date">{{item.addTime}}</div>
            <div class="con-r-title">
              <span>浏览 {{item.title}}</span>
              <img :src="item.picTure" />
            </div>
          </div>
        </div>
        <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import scroll from "@/components/scroll/scroll";
import { api_GetMemberFootPrint } from "@/api/meetingApi";
export default {
  name: "FootMark",
  props: [""],
  data() {
    return {
      foot: [],
      page: 1,
      isEnd: false,
      scrollHeight: "375px"
    };
  },

  components: { scroll },

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },

  beforeMount() {},

  mounted() {
    this.getFoot();
    this.setScrollHeight();
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getFoot();
      }
    },
    getFoot() {
      api_GetMemberFootPrint({
        Sorts: "-id",
        Page: this.page,
        PageSize: 10
      }).then(res => {
        if (res.result.length == 0) {
          this.isEnd = true;
        }
        this.foot = this.foot.concat(res.result); 
      });
    },
    setScrollHeight() {
      this.scrollHeight =
        window.innerHeight - this.$refs.bar.offsetHeight + "px";
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wapper {
  background: #fff;
  .scroll {
    overflow: hidden;
    .con {
      width: 90%;
      height: 85px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .con-r {
        width: 90%;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .con-r-date {
          font-size: 13px;
          color: #666;
        }
        .con-r-title {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 10px;
          span {
            width: 75%;
            font-size: 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
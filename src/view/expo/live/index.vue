<template>
  <div class="wrapper">
    <hb-layout :active="3">
      <div>
        <div class="box">
          <div class="banner">
            <img :src="require('@/assets/images/zhibo/banner.jpg')" />
          </div>
          <div class="now">
            <template v-for="(item,index) in lives">
              <div class="list" :key="index">
                <div class="pic">
                  <img :src="item.banner" />
                </div>
                <div class="name">
                  <img :src="require('@/assets/images/zhibo/now.gif')" />
                  <span>【图片直播】{{item.title}}</span>
                </div>
                <div class="date">开始时间：{{item.beginTime}}</div>
                <div class="hits">{{item.hits}}人次观看</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </hb-layout>
  </div>
</template>

<script>
import { api_GetLiveBroadCast } from "@/api/meetingApi";
import hbLayout from "@/components/layout/hbLayout";
//import { mapGetters } from "vuex";
export default {
  name: "LiveIndex",
  data() {
    return {
      lives: [],
      meetingId: 0
    };
  },

  components: { hbLayout },

  computed: {},

  beforeMount() {},

  mounted() {
    this.meetingId = this.$route.params.meetingId;
    this.getLiveBroadCast();
  },

  methods: {
    getLiveBroadCast() {
      api_GetLiveBroadCast({
        Filters: `MeetingId==${this.meetingId}`,
        Sorts: "BeginTime"
      }).then(res => {
        this.lives = res.result.result;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.box {
  background: #fff;
  .banner img {
    width: 100%;
  }
  .now {
    width: 90%;
    margin: 20px auto;
    .list {
      display: flex;
      flex-direction: column;
      align-content: space-between;
      margin-bottom: 20px;
      .pic img {
        width: 100%;
      }
      .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin: 5px 0;
        img {
          width: 46px;
          height: 20px;
        }
        span {
          font-size: 11pt;
          font-weight: bold;
          margin-left: 5px;
        }
      }
      .date {
        font-size: 10pt;
        color: #666;
        margin: 5px 0;
      }
      .hits {
        font-size: 10pt;
        color: #888;
      }
    }
  }
}
</style>
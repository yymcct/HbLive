<template>
  <div class="box">
    <div class="banner">
      <img src="https://hbyz.huobaowang.com/UpLoad/jpg/2019-12-11/20191211194112195000.jpg" />
    </div>
    <scroll class="scroll" :data="Meeting" pullup @scrollToEnd="scrollToEnd">
      <div class="now">
        <template v-for="item in Meeting">
          <div
            class="list"
            :key="item.id"
            @click="$router.push({ name: 'expo', params: { userId: item.id }})"
          >
            <div class="pic">
              <img :src="item.coverPictureUrl" />
            </div>
            <div class="name">{{item.sortName}}</div>
            <div class="date">时间：{{item.beginDate}}至{{item.endDate}}</div>
          </div>
        </template>
      </div>
      <div class="nomore" v-show="isEnd">---&nbsp;没有更多&nbsp;---</div>
    </scroll>
  </div>
</template>

<script>
import { api_GetMeetingList } from "@/api/meetingApi";
import scroll from "@/base/scroll/scroll";
export default {
  name: "Index",
  data() {
    return {
      Meeting: [],
      page: 1,
      isEnd: false
    };
  },
  components: { scroll },

  mounted() {
    this.getMeetingListByPage(this.page);
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getMeetingListByPage(this.page);
      }
    },
    getMeetingListByPage(page) {
      api_GetMeetingList({
        page: page,
        pageSize: 10,
        filters: "",
        sorts: "-id"
      }).then(res => {
        if (res.result.length == 0) {
          this.isEnd = true;
        }
        this.Meeting = this.Meeting.concat(res.result);
      });
    },

    MeetingInfo: function() {
      //   var id = e.currentTarget.dataset.id;
      //   var name = e.currentTarget.dataset.name;
      //   getApp().globalData.meetingid = id;
      //   getApp().globalData.meetingname = name;
      //   wx.switchTab({
      //     url: "/pages/expo/index/index",
      //     success: function(res) {},
      //     fail: function(res) {},
      //     complete: function(res) {}
      //   });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.box {
  background: #fff;
  .banner {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .now {
    width: 90%;
    margin: 20px auto;
    .list {
      display: flex;
      flex-direction: column;
      align-content: space-between;
      margin-bottom: 20px;
      .pic {
        img {
          width: 100%;
        }
      }
      .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin: 5px 0;
        font-size: 15px;
        font-weight: bold;
        margin-left: 5px;
      }
      .date {
        font-size: 13px;
        color: #666;
        margin: 5px 0;
      }
    }
  }

  .nomore {
    color: #666;
    text-align: center;
    font-size: 13px;
    margin: 10px;
  }
}
</style>
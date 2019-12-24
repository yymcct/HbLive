<template>
  <div class="top" v-cloak v-bind:style="{backgroundImage:'url('+ meeting.banner+')'}">
    <div class="top-main">
      <div class="title">{{meeting.sortName}}</div>
      <div class="addr">
        <img :src="require('@/assets/images/expo/dingwei.png')" />
        <div>{{meeting.address}}</div>
      </div>
      <div class="time">{{meeting.beginDate}}至{{meeting.endDate}}</div>
      <div class="sub">{{meeting.companyCount}}家展商 | {{meeting.hit}}位访问者</div>
    </div>
  </div>
</template>

<script>
import { api_GetMeeting } from "@/api/meetingApi";
export default {
  name: "ExpoTop",
  props: {
    meetingId: Number
  },
  data() {
    return {
      meeting: {
        banner: "",
        sortName: "",
        address: "",
        beginDate: "",
        endDate: "",
        companyCount: 0,
        hit: 0
      }
    };
  },
  mounted() {
    this.getMeeting();
  },

  methods: {
    getMeeting() {
      api_GetMeeting({ meetingid: this.meetingId }).then(res => {
        this.meeting = res.result;
      });
    }
  },

  watch: {
    meetingId: function() {
      this.getMeeting();
    }
  }
};
</script>
<style lang='scss' scoped>
.top {
  width: 100%;
  height: 150px;
  background-size: 100% 100%;
  padding: 8px 0;
  .top-main {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px 0;
    div {
      margin: 4px auto;
    }
    .title {
      font-size: 29px;
      color: #f00;
      font-weight: bold;
    }
    .addr {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 15px;
        height: 15px;
      }
      div {
        font-size: 15px;
        margin-left: 5px;
      }
    }
    .time {
      font-size: 15px;
      /* font-weight: 800; */
    }
    .sub {
      font-size: 12px;
      color: #f00;
    }
  }
}
</style>
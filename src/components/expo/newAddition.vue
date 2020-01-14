<template>
  <!-- 添加动态 -->
  <div class="wrapper" :class="{ left: slider }">
    <van-swipe class="swiper_container" :autoplay="3000" vertical :show-indicators="false">
      <template v-for="(item,index ) in dongtai">
        <van-swipe-item :key="index">
          <div class="piaofu-l-list">
            <img :src="item.pic" />
            <div class="wenzi">
              <span>{{item.addTime}}</span>
              <span v-if="item.type==1">展商《{{item.name}}》加入</span>
              <span v-else-if="item.type==2">展品《{{item.name}}》加入</span>
              <span v-else-if="item.type==3||item.type==4">{{item.userName}} 点赞 {{item.name}}</span>
              <span v-else-if="item.type==5||item.type==6">{{item.userName}} 评论 {{item.name}}</span>
            </div>
          </div>
        </van-swipe-item>
      </template>
    </van-swipe>
    <img
      class="allow"
      @click="slider=!slider"
      :src="slider ? require('@/assets/images/expo/right.png'): require('@/assets/images/expo/left.png') "
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api_GetNewAddition } from "@/api/meetingApi";
export default {
  name: "NewAddition",
  data() {
    return {
      dongtai: [],
      slider: false
    };
  },

  components: {},

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },

  beforeMount() {},

  mounted() {
    const type = 1;
    const meetingId = this.meetingId;
    api_GetNewAddition({ type, meetingId }).then(res => {
      this.dongtai = res.result;
    });
  },

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.left {
  left: -45% !important;
}
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #00b2ff;
  width: 50%;
  background-image: linear-gradient(to right, rgba(153, 230, 201, 0.2) , #4ad062);
  //   background-size: 200%;
   //  transition: background-color 0.5s;
  padding: 4px 4px;
  border-radius: 25px;
  overflow: hidden;
  .swiper_container {
    height: 40px;
    width: 100%;
    .piaofu-l-list {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .wenzi {
        width: 70%;
        margin-left: 5px;
        margin-right: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        overflow: hidden;
        span {
          white-space: nowrap;
          font-size: 12px;
          margin: 4px 0;
          color: #fff;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
  .allow {
    width: 20px;
    height: 20px;
  }
}
</style>
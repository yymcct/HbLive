<template>
  <div>
    <scroll class="tuijian" scrollX :data="companys" @scrollToEnd="scrollToEnd">
      <template v-for="item in companys">
        <div class="tuijian-com" bindtap="goCom" :key="item.id">
          <div class="com-top">
            <div class="com-top-left">
              <img :src="item.photo" />
              <div class="com-title">
                <div>{{item.name}}</div>
                <div class="address">
                  <img :src="require('@/assets/images/expo/dingwei.png')" />
                  <span>展位：{{item.meetingPlace}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="com-bottom">
            <div class="com-bottom-left">
              <div>
                <img :src="require('@/assets/images/expo/share1.png')" />
                <span>{{item.shareCount}}</span>
              </div>
              <div>
                <img :src="require('@/assets/images/expo/sees.png')" />
                <span>{{item.hit}}</span>
              </div>
              <div>
                <img :src="require('@/assets/images/expo/zan.png')" />
                <span>{{item.thumbsUpCount}}</span>
              </div>
            </div>
            <div class="com-bottom-right">
              <img v-if="item.productListDtos.length>0" :src="item.productListDtos[0].pic" />
            </div>
          </div>
        </div>
      </template>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/scroll/scroll";
import { api_GetCompanyByTopRecommend } from "@/api/meetingApi";
export default {
  name: "TopTuijian",
  props: {
    meetingId: Number
  },
  data() {
    return {
      companys: [],
      page: 1,
      isEnd: false
    };
  },

  components: {
    scroll
  },

  mounted() {
    this.getCompanys();
  },

  methods: {
    scrollToEnd() {
      if (!this.isEnd) {
        this.page++;
        this.getDataByPage();
      }
    },
    getCompanys() {
      api_GetCompanyByTopRecommend({
        Filters: "meetingID==" + this.meetingId,
        Sorts: "-id",
        Page: this.page,
        PageSize: 20
      }).then(res => {
        if (res.result.length == 0) {
          this.isEnd = true;
        } else {
          this.companys = this.companys.concat(res.result);
        }
      });
    }
  },

  watch: {
    meetingId: function() {
      this.page = 1;
      this.getCompanys();
    }
  }
};
</script>
<style lang='scss' scoped>
.tuijian {
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  padding: 15px 0;
  background: #f8f8f8;
  .tuijian-com {
    display: inline-block;
    background: #e5ebf3;
    width: 80vw;
    margin: 0 10px;
    padding: 5px 5px;
    border-radius: 5px;
    .com-top {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .com-top-left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        img {
          width: 40px;
          height: 40px;
          border-radius: 3px;
        }
      }
      .com-title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: start;
        padding-left: 5px;
        font-size: 16px;
        .address {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 15px;
            height: 15px;
            margin-top: 5px;
          }
          span {
            font-size: 15px;
            color: #666;
            margin-left: 5px;
            margin-top: 5px;
          }
        }
      }
    }

    .com-bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .com-bottom-left {
        width: 83%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        div {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
        img {
          width: 15px;
          height: 15px;
        }
        span {
          font-size: 16px;
          padding-left: 3px;
          color: #636363;
          margin-left: 5px;
        }
      }
      .com-bottom-right {
        img {
          width: 50px;
          height: 50px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
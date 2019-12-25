<template>
  <div class="wrapper">
    <template v-for="(item,index) in companys">
      <div style="position: relative;" v-bind:key="index">
        <img
          :src="require('@/assets/images/expo/huangguan.png')"
          class="huangguan"
          v-show="index<10"
          v-if="showTop"
        />
        <div class="con">
          <div class="con-left">
            <span v-if="showTop" v-show="index<10">NO.{{index+1}}</span>
            <img :src="item.photo" class="logo" />
            <img
              :src="require('@/assets/images/expo/jiaobiao.png')"
              class="jiaobiao"
              v-show="index<10"
              v-if="showTop"
            />
          </div>
          <div class="con-right">
            <div class="comname">{{item.name}}</div>
            <div
              v-if="item.productListDtos.length!=0"
              class="proname"
            >{{item.productListDtos[0].name}}</div>
            <div class="address">
              <img :src="require('@/assets/images/expo/dingwei.png')" />
              <span>展位：{{item.meetingPlace}}</span>
            </div>
            <div class="pic-con">
              <template v-for="pro in item.productListDtos">
                <img :key="pro.id" :src="pro.pic" />
              </template>
            </div>
            <div class="con-right-bottom">
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
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "MeetingCompany",
  props: {
    companys: Array,
    showTop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  width: 90%;
  margin: 0 auto;
  padding: 0 1%;
  height: 100%;
  .huangguan {
    position: absolute;
    width: 16.5px;
    height: 10px;
    margin-top: 6px;
  }
  .con {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 15px 0;
    position: relative;
    border-bottom: 0.5px solid #ededf2;
    .con-left {
      position: relative;
      span {
        position: absolute;
        top: 2.5px;
        left: 2.5px;
        z-index: 11;
        font-size: 6px;
        font-weight: bold;
        color: #efff1b;
      }
      .logo {
        width: 60px;
        height: 60px;
        border-radius: 2.5px;
        border: 0.5px solid #efefef;
      }
      .jiaobiao {
        position: absolute;
        top: 0;
        left: 0;
        width: 45px;
        height: 22.5px;
      }
    }
    .con-right {
      width: 70%;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      .comname {
        font-size: 16px;
        color: #323232;
        font-weight: 600;
      }
      .proname {
        font-size: 15px;
        color: #666;
        margin-top: 5px;
      }
      .address {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 5px;
        img {
          width: 15px;
          height: 15px;
        }
        span {
          font-size: 15px;
          color: #666;
          margin-left: 5px;
        }
      }
      .pic-con {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        margin: 15px 0;
        img {
          width: 75px;
          height: 75px;
        }
      }
      .con-right-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        img {
          width: 15px;
          height: 15px;
        }
        span {
          font-size: 16px;
          color: #636363;
          padding-left: 5px;
        }
      }
    }
  }
}
</style>
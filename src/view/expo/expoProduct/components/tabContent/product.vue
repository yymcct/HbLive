<template>
  <div class="wrapper">
    <template v-for="(item,index) in products">
      <div
        class="procon"
        :key="index"
        @click.stop="$router.push({ path: `/expo/${meetingId}/product/${item.id}`})"
      >
        <img :src="item.pic" class="proimg" />
        <div class="procon-name">{{item.name}}</div>
        <div class="procon-bottom">
          <div class="procon-bottom-list">
            <img :src="require('@/assets/images/expo/sees.png')" />
            <span>{{item.hit}}</span>
          </div>
          <div class="procon-bottom-list">
            <img :src="require('@/assets/images/expo/zan.png')" />
            <span>{{item.thumbUpCnt}}</span>
          </div>
        </div>
        <div class="jiaobiao" v-if="index<10 && showTop">
          <span>{{index+1}}</span>
          <img :src="require('@/assets/images/expo/projiaobiao.png')" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MeetingProduct",
  props: {
    products: Array,
    showTop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  width: 100%;
  margin: 0 auto;
  background-color: white;
  padding: 1% 1%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: center;
  .procon {
    position: relative;
    width: 46%;
    margin: 10px 1%;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    .proimg {
      width: 100%;
      display: block;
    }
    .procon-name {
      font-size: 13px;
      text-align: center;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .procon-bottom {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .procon-bottom-list {
        margin: 5px 5px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 14px;
          height: 14px;
        }
        span {
          font-size: 13px;
          color: #636363;
          margin-left: 5px;
        }
      }
    }
    .jiaobiao {
      position: absolute;
      bottom: 0;
      right: 0;
      img {
        width: 27.5px;
        height: 27.5px;
      }
      span {
        position: absolute;
        bottom: 6px;
        right: 2.5px;
        font-size: 11px;
        color: #efff1b;
      }
    }
  }
}
</style>
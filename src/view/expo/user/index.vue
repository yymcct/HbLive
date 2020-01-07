<template>
  <div class="wrapper">
    <hb-layout :active="4">
      <div class="box">
        <div class="main">
          <div class="user" v-if="userinfo">
            <div class="user-bg"></div>
            <div class="user-con">
              <div class="user-l">
                <img :src="userinfo.photo" />
              </div>
              <div class="user-r">
                <span>{{userinfo.nick}}</span>
              </div>
            </div>
          </div>
          <div class="users" v-else>
            <div class="users-l">
              <img :src="require('@/assets/images/expo/user.png')" />
            </div>
            <div class="users-r">
              <van-button type="default" size="small">授权登录</van-button>
            </div>
          </div>
        </div>
        <div class="menu">
          <div class="mulmenu">
            <van-collapse v-model="activeNames" accordion>
              <van-collapse-item
                title="我的云展秀"
                name="1"
                :icon="require('@/assets/images/expo/mys.png')"
              >
                <van-cell title-class="submenu" title="我的动态" is-link to="/myadver" />
                <van-cell title-class="submenu" title="我的评论/回复" is-link to="/myadver" />
                <van-cell title-class="submenu" title="我的足迹" is-link to="/myadver" />
                <van-cell title-class="submenu" title="我的点赞" is-link to="/myadver" />
              </van-collapse-item>
              <van-collapse-item
                title="我的公司"
                name="2"
                :icon="require('@/assets/images/expo/shop.png')"
              >我的公司</van-collapse-item>
            </van-collapse>
          </div>
          <div class="single">
            <van-cell-group>
              <van-cell
                title="意见反馈"
                is-link
                to="/myadver"
                :icon="require('@/assets/images/expo/fankui.png')"
              />
              <van-cell
                title="功能介绍"
                is-link
                to="/myadver"
                :icon="require('@/assets/images/expo/jieshao.png')"
              />
              <van-cell
                title="关于我们"
                :icon="require('@/assets/images/expo/about.png')"
                is-link
                to="/myadver"
              />
            </van-cell-group>
          </div>
        </div>

        <div class="bind">
          <van-button type="primary">我要参展</van-button>
        </div>
      </div>
    </hb-layout>
  </div>
</template>

<script>
import hbLayout from "@/components/layout/hbLayout";
export default {
  name: "",
  props: [""],
  data() {
    return {
      activeNames: ["1"],
      userinfo: null,
      com: {
        photo: "",
        name: ""
      }
    };
  },

  components: { hbLayout },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  background: #fff;

  .box {
    background: #efefef;
    .main {
      width: 100%;
      background: #fff;
      .user {
        width: 100%;
        background: #fff;
        margin: 0 auto;
        overflow: hidden;
        .user-con {
          position: absolute;
          top: 32px;
          left: 25px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          .users-l {
            margin-left: 25px;
            img {
              width: 65px;
              height: 65px;
              border-radius: 50%;
              border: 1px solid #fff;
            }
          }
          .user-r {
            width: 100%;
            height: 75px;
            margin-left: 10px;
            line-height: 75px;
          }
        }
      }
      .users {
        width: 100%;
        height: 150px;
        background: #fff;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        .users-l {
          margin-left: 25px;
          img {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            border: 1px solid #fff;
          }
        }
        .users-r {
          width: 100%;
          margin-left: 10px;
        }
      }
    }
    .menu {
      .single {
        margin-top: 10px;
      }
    }
    .bind {
      width: 100%;
      background: #fff;
      text-align: center;
      padding: 20px 0;
      font-size: 13pt;
      color: #09bb07;
    }
  }
}

.submenu {
  color: #999;
  font-size: 12px;
}
</style>
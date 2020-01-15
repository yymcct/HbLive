<template>
  <div class="wrapper">
    <hb-layout :active="4">
      <div class="box">
        <div class="main">
          <div class="user" v-if="user">
            <div
              class="bg"
              :style="{ background: '#fff url('+user.photo+') no-repeat center center / cover'}"
            ></div>
            <div class="user-con">
              <div class="user-l">
                <img :src="user.photo" />
              </div>
              <div class="user-r">
                <span>{{user.nick}}</span>
              </div>
            </div>
          </div>
          <div class="users" v-else>
            <div class="users-l">
              <img :src="require('@/assets/images/expo/user.png')" />
            </div>
            <div class="users-r">
              <van-button
                type="default"
                size="small"
                @click="$globalFun.userInfoAPI.ifLogin(null);"
              >授权登录</van-button>
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
                <van-cell
                  title-class="submenu"
                  title="我的动态"
                  is-link
                  :to="`/expo/${meetingId}/user/shortmsg`"
                />
                <van-cell
                  title-class="submenu"
                  title="我的评论/回复"
                  is-link
                  :to="`/expo/${meetingId}/user/comment`"
                />
                <van-cell
                  title-class="submenu"
                  title="我的足迹"
                  is-link
                  :to="`/expo/${meetingId}/user/footmark`"
                />
                <van-cell
                  title-class="submenu"
                  title="我的点赞"
                  is-link
                  :to="`/expo/${meetingId}/user/zan`"
                />
              </van-collapse-item>
              <van-collapse-item
                title="我的公司"
                name="2"
                :icon="require('@/assets/images/expo/shop.png')"
              >
                <div class="list-con" v-if="company">
                  <img :src="company.photo" class="list-con-l" />
                  <div class="list-con-r">
                    <span>{{company.name}}</span>
                    <div>
                      <img
                        :src="require('@/assets/images/expo/edit.png')"
                        @click="$router.push(`/expo/${meetingId}/user/zhanshang/company/${company.id}`)"
                      />
                      <img
                        :src="require('@/assets/images/expo/pic.png')"
                        @click="$router.push(`/expo/${meetingId}/user/zhanshang/${company.id}/product/0`)"
                      />
                      <img
                        :src="require('@/assets/images/expo/prolist.png')"
                        @click="$router.push(`/expo/${meetingId}/user/zhanshang/${company.id}/products`)"
                      />
                    </div>
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
          <div class="single">
            <van-cell-group>
              <van-cell
                title="意见反馈"
                is-link
                :to="`/expo/${meetingId}/user/feedback`"
                :icon="require('@/assets/images/expo/fankui.png')"
              />
              <van-cell
                title="功能介绍"
                is-link
                :to="`/expo/${meetingId}/user/function`"
                :icon="require('@/assets/images/expo/jieshao.png')"
              />
              <van-cell
                title="关于我们"
                :icon="require('@/assets/images/expo/about.png')"
                is-link
                :to="`/expo/${meetingId}/user/about`"
              />
            </van-cell-group>
          </div>
        </div>

        <div class="bind">
          <van-button type="primary" @click="canZhan">我要参展</van-button>
        </div>
      </div>
    </hb-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import hbLayout from "@/components/layout/hbLayout";
import { api_GetMemberCompanyinfo } from "@/api/meetingApi";
export default {
  name: "expoUser",
  data() {
    return {
      activeNames: ["1"],

      company: null
    };
  },
  computed: {
    ...mapGetters({
      meetingId: "meeting/meetingId",
      meeting: "meeting/meeting",
      user: "user/user"
    })
  },
  components: { hbLayout },

  beforeMount() {},

  mounted() {
    if (this.user) {
      this.getMemberCompanyinfo();
    }
    this.wxShare();
  },

  methods: {
    getMemberCompanyinfo() {
      api_GetMemberCompanyinfo().then(res => {
        if (res.result.id != 0) this.company = res.result;
      });
    },
    canZhan() {
      this.$globalFun.userInfoAPI.ifLogin(null);
      let path = this.company
        ? `/expo/${this.meetingId}/user/meeting/company/${this.company.id}`
        : `/expo/${this.meetingId}/user/zhanshang/company/0`;
      this.$router.push({ path: path });
    },
    wxShare() {
      if (this.meeting == null) {
        setTimeout(() => {
          this.wxShare();
        }, 500);
      } else {
        const meeting = this.meeting;
        console.log("weixin", meeting);
        this.$globalFun.wxShare(location.href.split("#")[0], {
          title: meeting.sortName + this.$route.meta.title,
          desc: `${meeting.beginDate}至${meeting.endDate.substr(8, 2)}日,${
            meeting.address
          }`,
          link: location.href,
          imgUrl: meeting.wxSharePicture
            ? meeting.wxSharePicture
            : meeting.banner,
          success: function() {}
        });
      }
    }
  },

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
        .bg {
          position: relative;
          width: 100%;
          height: 150px;
          filter: blur(20px);
        }
        .user-con {
          position: absolute;
          top: 40px;
          left: 30px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          .user-l {
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
            span {
              font-size: 16px;
              line-height: 70px;
              color: #fff;
            }
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
      .mulmenu {
        .list-con {
          width: 90%;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-size: 17px;
          color: #888888;
          border-bottom: 1px solid #ededed;
          line-height: 50px;
        }
        .list-con-l {
          width: 60px;
          height: 60px;
          margin: 10px 20px 10px 0;
        }
        .list-con-r {
          display: flex;
          flex-direction: column;
          span {
            line-height: 30px;
            font-size: 15px;
          }
          div {
            display: flex;
            flex-direction: row;
            align-items: center;
            line-height: 30px;
          }
          img {
            width: 25px;
            height: 25px;
            margin-right: 20px;
          }
        }
      }
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
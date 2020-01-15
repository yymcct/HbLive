<template>
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar :title="$route.meta.title" left-arrow @click-left="$router.go(-1)" />
    </div>
    <div class="maintop">
      <img :src="require('@/assets/images/expo/combg.png')" class="combg" />
      <img :src="company.photo" class="logo" />
    </div>
    <div class="comname">{{company.name}}</div>
    <div class="chengyao">诚邀您莅临我司展台</div>
    <div class="zhanwei">
      <img :src="require('@/assets/images/expo/dingwei-bai.png')" />
      <span>展位：{{company.meetingPlace}}</span>
    </div>
    <div class="exponame">{{meeting.sortName}}</div>
    <div
      class="expotime"
    >{{meeting.beginDate.replace(/-/g,'.')}}-{{meeting.endDate.substr(8,2)}} {{meeting.address}}</div>
    <!-- 公司描述 -->
    <div class="comdesc">
      <img :src="require('@/assets/images/expo/baijiantou.png')" class="baijiantou" />
      <div class="desctitle">公司简介</div>
      <div class="desccon">
        <div v-if="company.description">
          {{company.description.substring(0,100)}}......
          <span
            @click="$dialog.alert({title: '公司介绍', message: company.description})"
          >展开</span>
        </div>
      </div>
    </div>
    <!-- 产品 -->
    <div class="pro">
      <div class="protitle">
        <img :src="require('@/assets/images/expo/zuo.png')" />
        <span>产品服务</span>
        <img :src="require('@/assets/images/expo/you.png')" />
      </div>
      <div class="prolist">
        <template v-for="(item,index) in pro">
          <div
            class="procon"
            :key="index"
            @click="$router.push({ path: `/expo/${meetingId}/product/${item.id}` })"
          >
            <img :src="item.pic" />
            <span>{{item.name}}</span>
          </div>
        </template>
      </div>
    </div>
    <!-- 强势围观 -->
    <div class="user">
      <div class="usertitle">强势围观</div>
      <div class="usercon">
        <div class="userlist">
          <template v-for="(item, index) in memberpic">
            <img :src="item" :key="index" />
          </template>
        </div>
        <div class="usermore" v-if="company.thumbsUpCount - memberpic.length > 0">
          <span @click="getCompanyReplys()">更多（{{company.thumbsUpCount - memberpic.length}}）</span>
        </div>
      </div>
    </div>
    <!-- 留言榜 -->
    <div class="liuyan" id="liuyan">
      <div class="liuyantitle">
        <span class="biaoti">留言榜</span>
        <span class="liuyancount">共{{company.replyCount}}条</span>
      </div>
      <div class="liyuanforme" v-if="user">
        <img :src="user.photo" />
        <van-field name="liuyancon" v-model="liuyanContent" border placeholder="我也要说一句" />
        <button class="submit" @click="postCompanyReply()">提交</button>
      </div>
      <div class="commentlist" v-for="(item,index) in liuyan" :key="index">
        <div class="commentlist-top">
          <img :src="item.memberPhoto" />
          <span>{{item.memberNick}}</span>
        </div>
        <div class="commentlist-con">{{item.content}}</div>
        <div class="commentlist-bottom">
          <span class="time">{{item.addTime}}</span>
          <img :src="require('@/assets/images/expo/huifu.png')" />
        </div>
        <div class="commentlist-reply">
          <div class="reply-con" v-for="replys in item.replys" :key="replys.id">
            <span>{{replys.username}}</span> 回复
            <span>{{item.username}}</span>
            ：{{replys.content}}
          </div>
        </div>
      </div>
    </div>
    <img :src="require('@/assets/images/expo/heart.png')" class="heart" />
    <div class="zancount">共{{company.thumbsUpCount}}人点赞</div>
    <div class="comdescription">
      <template v-for="(item, index) in zannick">
        <span v-if="index==zannick.length-1" :key="index">{{item}}</span>
        <span v-else :key="index">{{item}},</span>
      </template>
    </div>
    <div class="see" @click="getComThumbsUpMemberNick()" v-if="zannickPage>0">
      查看全部
      <img :src="require('@/assets/images/expo/heijiantou.png')" />
    </div>
    <div class="create">
      <router-link
        class="a"
        :to="{ path: `/expo/${this.meetingId}/user/zhanshang/company/0`}"
      >免费创建一个火爆云展邀请函</router-link>
    </div>
    <!-- 底部 -->
    <div class="foot">
      <a class="kefu" :href="'tel:'+company.phone">
        <img :src="require('@/assets/images/expo/kefu.png')" />
        <span>客服</span>
      </a>
      <router-link class="zhanshang" :to="{ path: `/expo/${meetingId}/company`}">
        <img :src="require('@/assets/images/expo/zhanshang.png')" />
        <span>展商名录</span>
      </router-link>

      <div class="goliuyan" @click="goLiuyan">给TA留言</div>
      <!-- <div class="accept" >接收邀请</div> -->
      <router-link class="accept" :to="{ path: `/expo/${meetingId}/user/meeting/customer`}">接收邀请</router-link>
    </div>
    <!-- 访客 -->
    <div class="hits">
      <span>访客</span>
      <span>{{company.hit}}人</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  api_PostCompanyMemberHits,
  api_GetCompanyContent,
  api_GetComThumbsUpMemberNick,
  api_GetProductByIteam,
  api_GetCompanyReplys,
  api_PostMeetingHits,
  api_PostCompanyReply
} from "@/api/meetingApi";

export default {
  name: "Company",
  data() {
    return {
      companyId: 0,
      company: {
        photo: "",
        name: "",
        meetingPlace: ""
      },
      memberpic: [], //点赞用户图片
      memberpicPage: 1,
      zannick: [], //点赞用户昵称
      zannickPage: 1,
      pro: [], //公司产品
      liuyan: [], //用户评论

      liuyanContent: "" //留言内容
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      meetingId: "meeting/meetingId",
      meeting: "meeting/meeting",
      user: "user/user"
    })
  },

  beforeMount() {},

  mounted() {
    this.loadData().then(() => {
      this.wxShare();
    });

    this.getComThumbsUpMemberPic();
    this.getComThumbsUpMemberNick();
    //   this.$globalFun.userInfoAPI.ifLogin(this.postCompanyMemberHits);
  },

  methods: {
    async loadData() {
      const companyId = this.$route.params.companyId;
      const meetingId = this.meetingId;

      const company = await api_GetCompanyContent({ meetingId, Id: companyId });
      this.companyId = companyId;
      this.company = company.result;
      this.$route.meta.title = company.result.name;

      const product = await api_GetProductByIteam({
        Filters: `CompanyId==${companyId}`,
        sorts: "-id",
        page: 1,
        pagesize: 3
      });
      this.pro = product.result;

      this.getCompanyReplys();

      //点赞
      if (this.user) {
        api_PostCompanyMemberHits({ meetingId, companyId });
      }

      api_PostMeetingHits({ id: meetingId });
    },
    getCompanyReplys() {
      api_GetCompanyReplys({
        Filters: `CompanyId==${this.companyId}`,
        sorts: "-addTime",
        page: 1,
        pagesize: 50
      }).then(res => {
        this.liuyan = res.result;
      });
    },
    //获取点赞用户图像
    getComThumbsUpMemberPic() {
      if (this.memberpicPage > 0) {
        api_GetComThumbsUpMemberNick({
          Filters: `CompanyId==${this.companyId}`,
          Sorts: "-AddTime",
          Page: this.memberpicPage++,
          PageSize: 10,
          IsNick: false
        }).then(res => {
          if (res.result.length > 0) {
            this.memberpic = this.memberpic.concat(res.result);
          } else {
            this.memberpicPage = 0;
          }
        });
      }
    },
    //获取点赞用户昵称
    getComThumbsUpMemberNick() {
      if (this.zannickPage > 0) {
        api_GetComThumbsUpMemberNick({
          Filters: `CompanyId==${this.companyId}`,
          Sorts: "-AddTime",
          Page: this.zannickPage++,
          PageSize: 10,
          IsNick: true
        }).then(res => {
          if (res.result.length > 0) {
            this.zannick = this.zannick.concat(res.result);
          } else {
            this.zannickPage = 0;
          }
        });
      }
    },
    //提交公司评论
    postCompanyReply() {
      if (!this.liuyanContent.trim()) {
        this.$toast("内容不能为空!");
        return;
      }
      api_PostCompanyReply({
        id: this.companyId,
        content: this.liuyanContent,
        meetingid: this.meetingId
      }).then(() => {
        this.liuyanContent = "";
        this.$toast("提交成功!");
        this.getCompanyReplys();
      });
    },
    goLiuyan() {
      //this.$globalFun.userInfoAPI.ifLogin(null);
      this.$nextTick(() => {
        document.getElementById("liuyan").scrollIntoView();
      });
    },
    wxShare() {
      if (this.meeting == null) {
        setTimeout(() => {
          this.wxShare();
        }, 500);
      } else {
        const meeting = this.meeting;
        const company = this.company;
        this.$globalFun.wxShare(location.href.split("#")[0], {
          title: `【${company.name}】${meeting.sortName}欢迎您！`,
          desc: `${company.name}${meeting.sortName}展位号：${company.meetingPlace}`,
          link: location.href,
          imgUrl: company.wxSharePicture
            ? company.wxSharePicture
            : company.photo,
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
  .maintop {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .combg {
      width: 100%;
    }
    .logo {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      position: absolute;
      bottom: -37.5px;
      box-shadow: 0 0 5px rgb(190, 190, 190);
    }
  }
  .comname {
    margin: 52.5px 0 15px 0;
    text-align: center;
    font-size: 19px;
    font-weight: bold;
    color: #c00505;
  }
  .chengyao {
    text-align: center;
    color: #595959;
    font-size: 16px;
    font-weight: bold;
  }
  .zhanwei {
    width: 70%;
    margin: 15px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7.5px 0;
    background: #c00505;
    border-radius: 25px;
    img {
      width: 25px;
      height: 25px;
    }
    span {
      color: #fff;
      font-size: 19px;
    }
  }
  .exponame {
    text-align: center;
    font-size: 15px;
    color: #5e5e5e;
  }
  .expotime {
    text-align: center;
    font-size: 13px;
    color: #999999;
    margin: 5px 0 10px 0;
  }
  .comdesc {
    background: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    .baijiantou {
      width: 20px;
      height: 20px;
    }
    .desctitle {
      font-size: 19px;
      color: #333333;
      font-weight: bold;
      padding: 10px;
      position: relative;
    }
    .desctitle::after {
      content: "";
      width: 30px;
      height: 4px;
      background: #c00505;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50px;
    }
    .desccon {
      width: 90%;
      margin: 10px auto;
      box-shadow: 0 0 5px rgb(190, 190, 190);
      div {
        padding: 15px;
        font-size: 16px;
        color: #343434;
        text-indent: 25px;
        text-align: left;
        line-height: 22px;
        text-indent: 2em;
      }
      span {
        font-size: 16px;
        color: #c00505;
        margin-left: 5px;
      }
    }
  }
  .pro {
    background: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px auto;
    .protitle {
      font-size: 19px;
      color: #c00505;
      font-weight: bold;
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img {
        width: 17px;
        height: 17px;
      }
      span {
        margin: 0 10px;
      }
    }
    .prolist {
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .procon {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 100%;
        }
        span {
          color: #343434;
          font-size: 13px;
          margin: 5px 0;
        }
      }
    }
  }
  .user {
    background: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px auto;
    .usertitle {
      font-size: 19px;
      color: #333333;
      font-weight: bold;
      padding: 10px;
      position: relative;
    }
    .usertitle::after {
      content: "";
      width: 30px;
      height: 4px;
      background: #c00505;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50px;
    }
    .usercon {
      width: 90%;
      margin: 10px auto;
      box-shadow: 0 0 5px rgb(190, 190, 190);
      border-radius: 10px;
      background: #fff;
      .userlist {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        background: #fff;
        padding: 15px;
        img {
          width: 8%;
          margin: 2.5px 1%;
          border-radius: 50%;
        }
      }
      .usermore {
        background: #f6f6f6;
        text-align: center;
        height: 40px;
        span {
          font-size: 12px;
          color: #343434;
          line-height: 40px;
        }
      }
    }
  }
  .liuyan {
    width: 90%;
    background: #fff;
    margin: 10px auto;
    .liuyantitle {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 0.5px solid #e6e6e6;
      padding: 10px 0;
      .biaoti {
        font-size: 16px;
        color: #333333;
        font-weight: bold;
      }
      .liuyancount {
        font-size: 12px;
        color: #999999;
      }
    }
    .liyuanforme {
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .liuyancon {
        // border: 1px solid #999;
        // height: 40px;
        // margin-left: 5px;
        // padding-left: 7.5px;
        // background: #f4f4f4;
        // font-size: 14px;
        width: auto;
      }

      .submit {
        height: 43px;
        line-height: 43px;
        border-radius: 0px;
        border: 1px solid #e6e6e6;
        font-size: 13px;
        background-color: #fff;
        width: 100px;
      }
      .submit::after {
        border: none;
      }
    }
    .commentlist {
      background: #fff;
      border-top: 1px #f3f3f3 solid;
      display: flex;
      flex-direction: column;
      vertical-align: middle;
      padding: 15px;
      .commentlist-top {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
        span {
          font-size: 12px;
          color: #888;
          margin-left: 15px;
        }
      }

      .commentlist-con {
        font-size: 15px;
        letter-spacing: 1px;
        margin-left: 35px;
        padding: 10px;
      }
      .commentlist-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-left: 45px;
        margin-bottom: 10px;
        span {
          font-size: 13px;
          color: #888;
        }
        img {
          width: 25px;
          height: 25px;
          margin-right: 10px;
        }
      }

      .commentlist-reply {
        margin-left: 45px;
        background: #f3f3f3;
        .reply-con {
          font-size: 12px;
          padding: 10px;
          span {
            color: #576b95;
          }
        }
      }
    }
  }

  .heart {
    width: 100px;
    height: 96px;
    display: block;
    margin: 0 auto;
    padding-top: 25px;
  }
  .zancount {
    text-align: center;
    margin: 25px auto;
    font-size: 19px;
    font-weight: bold;
    color: #c00505;
  }
  .comdescription {
    width: 90%;
    margin: 25px auto;
    font-size: 13px;
    color: #999;
  }
  .see {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px 0 75px 0;
    font-size: 15px;
    color: #5e5e5e;
    img {
      width: 15px;
      height: 15px;
      margin-left: 5px;
    }
  }
  .create {
    margin: 5px 0 75px 0;
    color: #999;
    text-align: center;
    .a {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .foot {
    width: 100%;
    height: 55px;
    background: #fff;
    border-top: 1px solid #e6e6e6;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
    }
    span {
      font-size: 12px;
      color: #999;
    }
    .kefu {
      width: 24.9%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 0.5px solid #e6e6e6;
    }
    .zhanshang {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .goliuyan {
      width: 25%;
      line-height: 55px;
      text-align: center;
      background: #ff2f12;
      font-size: 13px;
      color: #fff;
    }
    .accept {
      width: 25%;
      line-height: 55px;
      text-align: center;
      background: #fea501;
      font-size: 13px;
      color: #fff;
    }
  }
  .hits {
    position: fixed;
    right: 5%;
    top: 25%;
    z-index: 999;
    background: #000;
    opacity: 0.3;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    border-radius: 10px;
    padding: 7.5px 15px;
    span {
      color: #fff;
      font-size: 11px;
    }
  }
}
</style>
<template>
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar :title="product.name" left-arrow @click-left="$router.go(-1)" />
    </div>
    <div class="box">
      <div class="swiper">
        <img :src="product.pic" mode="widthFix" />
      </div>
      <div class="main">
        <div class="protitle">
          <div class="protitle-l">{{product.name}}</div>
          <div class="protitle-r">
            <img :src="require('@/assets/images/expo/see.png')" />
            <span>浏览 · {{product.hit}}</span>
          </div>
        </div>
        <div class="prodesc">
          <div class="prodesc-title">展品详情</div>
          <div class="prodesc-con" v-html="product.description"></div>
        </div>
        <div class="zans" v-show="product.memberDtos.length>0">
          <img :src="require('@/assets/images/expo/zan-blue.png')" />
          <template v-for="(item, index) in product.memberDtos">
            <span v-if="index==product.memberDtos.length-1" :key="index">{{item.nick}}</span>
            <span v-else :key="index">{{item.nick}},</span>
          </template>
        </div>
        <div class="liuyan" id="liuyan">
          <div class="liuyantitle">
            <span class="biaoti">留言榜</span>
            <span class="liuyancount">共{{product.replyCount}}条</span>
          </div>
          <div class="liyuanforme">
            <img v-if="user" :src="user.photo" />
            <input
              name="liuyancon"
              v-model="liuyanContent"
              placeholder="我也要说一句"
              placeholder-class="placeholdeers"
            />
            <button class="submit" @click="postProductReply()">提交</button>
          </div>
          <div class="commentlist" v-for="(item, index) in liuyan" :key="index">
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
              <div class="reply-con" v-for="(replys, index) in item.replys" :key="index">
                <span>{{replys.username}}</span>回复
                <span>{{item.username}}</span>
                ：{{replys.content}}
              </div>
            </div>
          </div>
        </div>
        <div class="com" @click="$router.push({ path: `/expo/${meetingId}/company/${company.id}`})">
          <img :src="company.photo" class="comlogo" />
          <div class="com-con">
            <div class="comname">{{company.name}}</div>
            <div class="zhanwei">
              <img :src="require('@/assets/images/expo/dingwei.png')" />
              <span>展位：{{company.meetingPlace}}</span>
            </div>
            <div class="comcount">
              <div class="comshare">
                <img :src="require('@/assets/images/expo/share1.png')" />
                <span>{{company.shareCount}}</span>
              </div>
              <div class="comliuyan">
                <img :src="require('@/assets/images/expo/sees.png')" />
                <span>{{company.hit}}</span>
              </div>
              <div class="comzan">
                <img :src="require('@/assets/images/expo/zan.png')" />
                <span>{{company.thumbsUpCount}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="prolist">
          <div class="prolist-title">其他展品</div>
          <div class="prolist-con">
            <template v-for="(item, index) in prolist">
              <router-link class="pro" :key="index" :to="`/expo/${meetingId}/product/${item.id}`">
                <img :src="item.pic" />
                <span>{{item.name}}</span>
              </router-link>
            </template>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="foot-list">
          <img :src="require('@/assets/images/expo/kefu.png')" />
          <span>客服</span>
        </div>
        <div class="foot-list" @click="goLiuyan">
          <img :src="require('@/assets/images/expo/liuyan-f.png')" />
          <span>留言</span>
        </div>
        <router-link class="foot-list" :to="`/expo/${meetingId}/product`">
          <img :src="require('@/assets/images/expo/zhanpin-f.png')" />
          <span>展品</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  api_PostProductMemberHits,
  api_GetProductContent,
  api_GetCompanyContent,
  api_GetProductReplys,
  api_GetCompanyOtherProduct,
  api_PostMeetingHits,
  api_PostProductReply
} from "@/api/meetingApi";
export default {
  name: "",
  props: [""],
  data() {
    return {
      productId: 0,
      product: {
        pic: "",
        name: "",
        hit: 0,
        description: "",
        memberDtos: []
      },
      company: {
        photo: "",
        name: "",
        meetingPlace: ""
      },
      liuyan: [], //产品评论
      prolist: [], //其他产品
      liuyanContent: ""
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
    this.productId = this.$route.params.productId;

    this.getProductContent(res => {
      this.$globalFun.wxShare(location.href.split("#")[0], {
        title: res.name,
        desc: res.description,
        link: location.href,
        imgUrl: res.pic,
        success: function() {}
      });
    });
    this.getProductReplys();
    this.getCompanyOtherProduct();
    this.postMeetingHits();
    this.PostProductMemberHits();
  },

  methods: {
    // 点赞
    PostProductMemberHits() {
      api_PostProductMemberHits({
        meetingId: this.meetingId,
        id: this.productId
      });
    },
    //获取产品详情
    getProductContent(callback) {
      api_GetProductContent({
        meetingId: this.meetingId,
        id: this.productId
      }).then(res => {
        this.product = res.result;
        if (callback) {
          callback(this.product);
        }
      });
    },
    // 获取公司详情
    getCompanyContent() {
      api_GetCompanyContent({
        meetingId: this.meetingId,
        Id: this.product.companyId
      }).then(res => {
        this.company = res.result;
      });
    },
    // 产品评论
    getProductReplys() {
      api_GetProductReplys({
        Filters: "productid==" + this.productId,
        sorts: "-addTime",
        page: 1,
        pagesize: 50
      }).then(res => {
        this.liuyan = res.result;
      });
    },
    // 获取公司其他产品
    getCompanyOtherProduct() {
      api_GetCompanyOtherProduct({
        meetingId: this.meetingId,
        Id: this.productId
      }).then(res => {
        this.prolist = res.result;
      });
    },
    //点赞会议
    postMeetingHits() {
      api_PostMeetingHits({
        id: this.meetingId
      });
    },
    postProductReply() {
      if (!this.liuyanContent.trim()) {
        this.$toast("内容不能为空!");
        return;
      }
      api_PostProductReply({
        id: this.productId,
        content: this.liuyanContent,
        meetingid: this.meetingId
      }).then(() => {
        this.liuyanContent = "";
        this.$toast("提交成功!");
        this.getProductReplys();
      });
    },
    goLiuyan() {
      //this.$globalFun.userInfoAPI.ifLogin(null);
      this.$nextTick(() => {
        document.getElementById("liuyan").scrollIntoView();
      });
    }
  },

  watch: {
    product: function() {
      if (this.product.companyId) {
        this.getCompanyContent();
      }
    },
    $route(val) {
      if (val.params.hasOwnProperty("productId")) {
        const productId = val.params.productId;
        if (productId != null && productId != this.productId) {
          this.productId = this.$route.params.productId;
          this.getProductContent();
          this.getProductReplys();
          this.getCompanyOtherProduct();
          this.postMeetingHits();
          this.PostProductMemberHits();
          console.log("222val");
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.wrapper {
  background: #fff;
  .box {
    .swiper {
      img {
        width: 100%;
      }
    }
    .main {
      width: 90%;
      margin: 15px auto;
      .protitle {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .protitle-l {
          font-size: 19px;
          font-weight: 600;
        }
        .protitle-r {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        img {
          width: 20px;
          height: 20px;
        }
        span {
          font-size: 12px;
          color: #666;
        }
      }

      .prodesc {
        margin: 20px 0;
        .prodesc-title {
          margin: 10px 0;
          font-size: 16px;
          font-weight: 600;
        }
        .prodesc-con {
          font-size: 16px;
          color: #666;
          line-height: 22px;
        }
      }
      .zans {
        margin: 5px 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 12px;
          height: 12px;
          margin-right: 2.5px;
        }
        span {
          font-size: 12px;
          color: #438ee3;
        }
      }
      .liuyan {
        background: #fff;
        margin: 10px auto;
        .liuyantitle {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px solid #e6e6e6;
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
          input {
            border: 1px solid #e6e6e6;
            height: 40px;
            margin-left: 5px;
            padding-left: 7.5px;
            background: #f4f4f4;
            font-size: 13px;
          }
          .liuyancon {
            margin: 25px auto;
          }

          .submit {
            height: 43px;
            line-height: 43px;
            border-radius: 0px;
            border: 1px solid #e6e6e6;
            font-size: 13px;
            padding: 0 20px;
            background-color: #fff;
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
            }
            span {
              color: #576b95;
            }
          }
        }
      }
      .com {
        background: #e5ebf3;
        padding: 7.5px 7.5px;
        border-radius: 10px;
        margin: 10px auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .comlogo {
          width: 50px;
          height: 50px;
        }
        .com-con {
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          .comname {
            font-size: 17px;
            font-weight: 600;
          }
          .zhanwei {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-top: 6px;
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
          .comcount {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 6px;
            .comshare {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              img {
                width: 15px;
                height: 15px;
              }
              span {
                font-size: 15px;
                color: #636363;
                margin-left: 5px;
              }
            }
            .comliuyan {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              img {
                width: 15px;
                height: 15px;
              }
              span {
                font-size: 15px;
                color: #636363;
                margin-left: 5px;
              }
            }
            .comzan {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              img {
                width: 15px;
                height: 15px;
              }
              span {
                font-size: 15px;
                color: #636363;
                margin-left: 5px;
              }
            }
          }
        }
      }
      .prolist {
        margin: 10px 0 60px 0;
        .prolist-title {
          font-size: 16px;
          font-weight: 600;
          padding-bottom: 15px;
          border-bottom: 1px solid #e6e6e6;
        }
        .prolist-con {
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;
          padding: 10px 0;
          .pro {
            width: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 0.5%;
            img {
              width: 100%;
            }
            span {
              font-size: 13px;
              color: rgb(37, 37, 37);
              padding: 7.5px 0;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .pro:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
    .foot {
      width: 100%;
      height: 55px;
      background: #fff;
      border-top: 1px solid #e6e6e6;
      position: fixed;
      bottom: 0;
      z-index: 999;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .foot-list {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid #e6e6e6;
        img {
          width: 25px;
          height: 25px;
        }
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
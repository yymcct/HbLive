<template>
  <!-- 展商添加参展公司 -->
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar :title="$route.meta.title" left-arrow @click-left="$router.go(-1)" />
    </div>
    <div class="content">
      <van-row type="flex" justify="center">
        <van-image class="logo" :src="user.photo" />
      </van-row>
      <van-row type="flex" justify="center">
        <span class="company-name">{{user.nick}}</span>
      </van-row>
      <van-cell-group>
        <van-field v-model="customer.realName" required label="姓名" placeholder="请输入姓名" />
        <van-field v-model="customer.phone" required label="手机" type="tel" placeholder="请输入手机号" />
        <van-field v-model="customer.smsCheck" required label="验证码" placeholder="请输入验证码">
          <van-button
            slot="button"
            size="small"
            type="primary"
            :disabled="customer.phone.length<11 || !disabledCodeBtn"
            @click="sendSms"
          >{{codeText}}</van-button>
        </van-field>
        <van-field v-model="customer.customCompanyName" label="公司" placeholder="请输入公司名称" />
        <van-field v-model="customer.occupation" label="职务" placeholder="请输入职务" />
        <van-field v-model="customer.address" label="地址" placeholder="请输入地址" />
      </van-cell-group>
      <van-row type="flex" justify="center" class="submit">
        <van-button
          type="info"
          class="btn"
          :disabled="customer.realName.length==0 || customer.phone.length < 11  
                  || customer.smsCheck.length < 4 ||btnPosting==true"
          @click="post"
          :loading="btnPosting"
          loading-text="发布中..."
        >提交</van-button>
      </van-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api_GetSmsCheck, api_PostMemberInfo } from "@/api/meetingApi";
export default {
  name: "",
  props: [""],
  data() {
    return {
      customer: {
        realName: "",
        phone: "",
        smsCheck: "",
        address: "",
        occupation: "",
        customCompanyName: ""
      },
      codeText: "发送验证码",
      btnPosting: false,
      disabledCodeBtn: true
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      meetingId: "meeting/meetingId",
      user: "user/user"
    })
  },

  mounted() {
    this.$globalFun.userInfoAPI.ifLogin(null);
  },

  methods: {
    post() {
      api_PostMemberInfo(this.customer).then(() => {
        this.$toast("参展成功");
        this.$router.go(-1);
      });
    },
    sendSms() {
      api_GetSmsCheck({ phone: this.customer.phone }).then(res => {
        if (res) {
          this.countDown(60);
        }
      });
    },
    countDown(time) {
      if (time === 0) {
        this.disabledCodeBtn = true;
        this.codeText = "发送验证码";
        return;
      } else {
        this.disabledCodeBtn = false;
        this.codeText = "重新发送(" + time + ")";
        time--;
      }
      setTimeout(() => {
        this.countDown(time);
      }, 1000);
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  .content {
    .logo {
      width: 80px;
      height: 80px;
      margin-top: 10px;
    }
    .company-name {
      font-size: 13px;
      margin: 10px;
    }
    .btn {
      margin-top: 20px;
      width: 80%;
    }
  }
}
</style>
<template>
  <!-- 展商添加参展公司 -->
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        right-text="参展产品"
        @click-left="$router.go(-1)"
        @click-right="$router.push(`/expo/${meetingId}/user/meeting/${company.id}/products`)"
      />
    </div>
    <div class="content">
      <van-row type="flex" justify="center">
        <van-image class="logo" :src="company.photo" />
      </van-row>
      <van-row type="flex" justify="center">
        <span class="company-name">{{company.name}}</span>
      </van-row>
      <van-cell-group>
        <van-field
          v-model="selectMeetingArea.name"
          required
          readonly
          clickable
          @click="showPicker = true"
          label="类别"
          placeholder="请选择类别"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            value-key="name"
            show-toolbar
            :columns="meetingArea"
            @cancel="showPicker = false"
            @confirm="onPickerConfirm"
          />
        </van-popup>
        <van-field v-model="companyMeeting.meetingPlace" required label="展位号" placeholder="请输入展位号" />
        <van-field v-model="companyMeeting.linkMan" required label="联系人" placeholder="请输入联系人姓名" />
        <van-field
          v-model="companyMeeting.phone"
          required
          label="手机"
          type="tel"
          placeholder="请输入手机号"
        />
        <van-field v-model="companyMeeting.smsCheck" required label="验证码" placeholder="请输入验证码">
          <van-button
            slot="button"
            size="small"
            type="primary"
            :disabled="companyMeeting.phone.length<11 || !disabledCodeBtn"
            @click="sendSms"
          >{{codeText}}</van-button>
        </van-field>
      </van-cell-group>
      <van-row type="flex" justify="center" class="submit">
        <van-button
          type="info"
          class="btn"
          :disabled="companyMeeting.meetingPlace.length==0 || companyMeeting.phone.length < 11  
                  || companyMeeting.linkMan.length==0 || companyMeeting.smsCheck.length < 4 ||btnPosting==true"
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
import {
  api_GetMemberCompanyinfo,
  api_GetMeetingArea,
  api_PostCompanyMeeting,
  api_GetSmsCheck,
  api_GetCompanyMeeting
} from "@/api/meetingApi";
export default {
  name: "",
  props: [""],
  data() {
    return {
      company: {
        photo: "",
        name: ""
      },
      meetingArea: [],
      companyMeeting: {
        id: 0,
        companyId: 0,
        meetingId: 0,
        meetingAreaId: 0,
        meetingPlace: "",
        phone: "",
        linkMan: "",
        smsCheck: ""
      },
      showPicker: false,
      selectMeetingArea: { name: "", id: 0 },
      codeText: "发送验证码",
      btnPosting: false,
      disabledCodeBtn: true
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
    this.LoadData();
  },

  methods: {
    async LoadData() {
      const meetingId = this.meetingId;
      const company = await api_GetMemberCompanyinfo();
      const meetingArea = await api_GetMeetingArea({ meetingId });

      this.company = company.result;
      this.meetingArea = meetingArea.result;

      this.companyMeeting.companyId = this.company.id;
      this.companyMeeting.meetingId = this.meetingId;

      const companyMeeting = await api_GetCompanyMeeting({
        MeetingId: meetingId,
        CompanyId: company.result.id
      });

      if (companyMeeting.result != null) {
        this.companyMeeting =  Object.assign(this.companyMeeting, companyMeeting.result);
        this.selectMeetingArea = this.meetingArea.find(
          n => n.id == companyMeeting.result.meetingAreaId
        );
      }
    },
    onPickerConfirm(value) {
      this.showPicker = false;
      this.selectMeetingArea = value;
      this.companyMeeting.meetingAreaId = value.id;
    },
    post() {
      api_PostCompanyMeeting(this.companyMeeting).then(() => {
        this.$toast("参展成功");
        this.$router.go(-1);
      });
    },
    sendSms() {
      api_GetSmsCheck({ phone: this.companyMeeting.phone }).then(res => {
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
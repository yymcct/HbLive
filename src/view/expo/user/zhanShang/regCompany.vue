<template>
  <!-- 展商添加公司 -->
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.push(`/expo/${meetingId}/user`)"
      />
    </div>
    <div class="content">
      <van-row type="flex" justify="center">
        <van-col>
          <van-uploader
            v-model="fileList"
            :max-count="1"
            upload-text="公司LOGO"
            :before-read="beforeRead"
          />
        </van-col>
      </van-row>
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="company.name" required label="公司名称" placeholder="请输入公司名称" />
        <van-field
          v-model="company.description"
          label="公司简介"
          placeholder="请输入公司简介"
          rows="5"
          type="textarea"
          autosize
          required
          maxlength="500"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <van-row type="flex" justify="center" class="submit">
      <van-button
        type="info"
        class="btn"
        :disabled="company.name.length==0 || company.description.length==0 || fileList.length==0 || btnPosting==true"
        @click="post"
        :loading="btnPosting"
        loading-text="发布中..."
      >提交</van-button>
    </van-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api_PostAddCompanyInfo, api_PostImgWithWater } from "@/api/meetingApi";
export default {
  name: "",
  props: [""],
  data() {
    return {
      company: {
        id: 0,
        name: "",
        photo: "",
        description: "",
        site: "",
        banner: ""
      },
      fileList: [],
      btnPosting: false
    };
  },

  components: {},

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },

  beforeMount() {},

  mounted() {},

  methods: {
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        this.$toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    post() {
      this.btnPosting = true;
      api_PostImgWithWater(this.fileList)
        .then(res => {
          let imgStr = this.$globalFun.other.ImagesPathToStr(res.result.files);
          return imgStr;
        })
        .then(res => {
          this.company.photo = res;
          return api_PostAddCompanyInfo(this.company);
        })
        .then(() => {
          this.$toast("发布成功");
          this.$router.push(`/expo/${this.meetingId}/user`);
        })
        .catch(() => {
          this.btnPosting = false;
        })
        .finally(() => {
          this.btnPosting = false;
          this.$router.push(`/expo/${this.meetingId}/user`);
        });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  .content {
    margin: 20px 0;
    .logotext {
      font-size: 12px;
    }
  }
  .submit {
    .btn {
      margin: 20px 0;
      width: 80%;
    }
  }
}
</style>
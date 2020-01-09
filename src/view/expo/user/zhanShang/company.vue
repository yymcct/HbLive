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
import {
  api_PostAddCompanyInfo,
  api_PostImgWithWater,
  api_GetMemberCompanyinfo
} from "@/api/meetingApi";
export default {
  name: "",
  props: [""],
  data() {
    return {
      isEditImg: false, //标识添加是否编辑了图片, 如果编辑了重新上传图片
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

  mounted() {
    if (this.$route.params.companyId != 0) {
      api_GetMemberCompanyinfo().then(res => {
        if (res.result.id != 0) {
          this.company.id = res.result.id;
          this.company.name = res.result.name;
          this.company.photo = res.result.photo.replace(/^http:\/\/[^/]+/, "");
          this.fileList.push({
            url: res.result.photo
          });
          this.company.description = res.result.description;
        }
      });
    }
    console.log(this.fileList);
  },

  methods: {
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        this.$toast("请上传 jpg 格式图片");
        return false;
      }
      this.isEditImg = true;
      return true;
    },
    post() {
      this.btnPosting = true;
      if (this.isEditImg) {
        api_PostImgWithWater(this.fileList)
          .then(res => {
            let imgStr = this.$globalFun.other.ImagesPathToStr(
              res.result.files
            );
            return imgStr;
          })
          .then(res => {
            this.company.photo = res;
            return api_PostAddCompanyInfo(this.company);
          })
          .then(() => {
            this.$toast(
              this.$route.params.companyId == 0 ? "发布成功" : "编辑成功"
            );
            this.$router.push(`/expo/${this.meetingId}/user`);
          })
          .catch(() => {
            this.btnPosting = false;
          })
          .finally(() => {
            this.btnPosting = false;
            this.$router.push(`/expo/${this.meetingId}/user`);
          });
      } else {
        api_PostAddCompanyInfo(this.company)
          .then(() => {
            this.$toast(
              this.$route.params.companyId == 0 ? "发布成功" : "编辑成功"
            );
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
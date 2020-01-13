<template>
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="content">
      <van-field
        v-model="content"
        rows="5"
        autosize
        type="textarea"
        maxlength="300"
        placeholder="请填写10个字以上的问题描述, 以便我们提供更好的帮助..."
        show-word-limit
      />
    </div>
    <div class="pic">
      <van-uploader v-model="fileList" multiple :max-count="3" :before-read="beforeRead" />
    </div>
    <div class="submit">
      <van-button
        class="btn"
        :disabled="content.length<10 || btnPosting==true"
        type="primary"
        @click="post"
        :loading="btnPosting"
        loading-text="提交中..."
      >提交</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api_PostUserFaceBack, api_PostImgWithWater } from "@/api/meetingApi";
export default {
  name: "",
  props: [""],
  data() {
    return {
      content: "",
      fileList: [],
      btnPosting: false
    };
  },

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },

  mounted() {
    this.$globalFun.userInfoAPI.ifLogin(null, true);
  },

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
          return api_PostUserFaceBack({
            Content: this.content,
            Images: res,
            BugClient: 6,
            V: "0.1"
          });
        })
        .then(() => {
          this.$toast("发布成功");
          this.$router.push(`/expo/${this.meetingId}/user`);
        })
        .catch(() => {
          this.btnPosting = false;
        })
        .finally(res => {
          console.log(res);
          this.btnPosting = false;
          this.$router.push(`/expo/${this.meetingId}/user`);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
.wrapper {
  background-color: white;
  height: 100vh;
  .pic {
    margin: 0 20px;
  }
  .submit {
    margin: 20px 20px;
    .btn {
      width: 100%;
    }
  }
}
</style>
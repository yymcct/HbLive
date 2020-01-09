<template>
  <div class="wrapper">
    <van-nav-bar
      title="发布动态"
      left-text="返回"
      left-arrow
      @click-left="$router.push('/expo/shortmsg')"
    />
    <div class="content">
      <van-field
        v-model="shortMsg.content"
        rows="5"
        autosize
        type="textarea"
        maxlength="300"
        placeholder="这一刻的想法..."
        show-word-limit
      />
    </div>
    <div class="pic">
      <van-uploader v-model="fileList" multiple :max-count="3" :before-read="beforeRead" />
    </div>
    <div class="tishi">
      <van-checkbox v-model="isReadMZSM" shape="square">
        <span>发布信息前请先查看&nbsp;</span>
        <span url="/pages/expo/xieyi/xieyi" class="mz">免责声明</span>
      </van-checkbox>
    </div>
    <div class="submit">
      <van-button
        class="btn"
        :disabled="shortMsg.content.length<5 || isReadMZSM==false || btnPosting==true"
        type="primary"
        @click="post"
        :loading="btnPosting"
        loading-text="发布中..."
      >立即发布</van-button>
    </div>
  </div>
</template>
    
<script>
import { api_PostShortMsg, api_PostImgWithWater } from "@/api/meetingApi";
export default {
  name: "PostShortMsg",
  data() {
    return {
      shortMsg: {
        meetingId: 0,
        content: "",
        picture: "",
        address: "",
        video: ""
      },
      fileList: [],
      isReadMZSM: true,//已阅读免责声明
      btnPosting: false
    };
  },

  components: {},

  computed: {},

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
          this.shortMsg.picture = res;
          return api_PostShortMsg(this.shortMsg);
        })
        .then(() => {
          this.$toast("发布成功");
          this.$router.push("/expo/shortmsg");
        })
        .catch(() => {
          this.btnPosting = false;
        })
        .finally(() => {
          this.btnPosting = false;
          this.$router.push("/expo/shortmsg");
        });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  background-color: white;
  .pic {
    margin: 0 20px;
  }
  .tishi {
    margin: 0 20px;
    span {
      font-size: 13px;
      line-height: 40px;
      color: #888888;
    }
    .mz {
      color: blue;
    }
  }
  .submit {
    margin: 0 20px;
    .btn {
      width: 100%;
    }
  }
}
</style>
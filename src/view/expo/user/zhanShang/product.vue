<template>
  <!-- 展商添加公司 -->
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar :title="$route.meta.title" left-arrow @click-left="$router.go(-1)" />
    </div>
    <div class="content">
      <van-row type="flex" justify="center">
        <van-col>
          <van-uploader
            v-model="fileList"
            :max-count="1"
            upload-text="产品图片"
            :before-read="beforeRead"
          />
        </van-col>
      </van-row>
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="product.name" required label="产品名称" placeholder="请输入产品名称" />
        <van-field
          v-model="product.description"
          label="产品详情"
          placeholder="请输入产品详情"
          rows="5"
          type="textarea"
          autosize
          required
          maxlength="1000"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <van-row type="flex" justify="center" class="submit">
      <van-button
        type="info"
        class="btn"
        :disabled="product.name.length==0 || product.description.length==0 || fileList.length==0 || btnPosting==true"
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
  api_PostMeetingProduct,
  api_PostImgWithWater,
  api_GetProductContentById
} from "@/api/meetingApi";
export default {
  name: "",
  props: [""],
  data() {
    return {
      isEditImg: false, //标识添加是否编辑了图片, 如果编辑了重新上传图片
      product: {
        id: 0,
        companyId: 0,
        name: "",
        pic: "",
        video: "",
        description: ""
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
    this.product.companyId = this.$route.params.companyId;
    if (this.$route.params.productId != 0) {
      api_GetProductContentById({
        id: this.$route.params.productId
      }).then(res => {
        if (res.result.id != 0) {
          this.product.id = res.result.id;
          this.product.companyId = res.result.companyId;
          this.product.name = res.result.name;
          this.product.pic = res.result.pic.replace(/^http:\/\/[^/]+/, "");
          this.product.video = res.result.video;
          this.fileList.push({
            url: res.result.pic
          });
          this.product.description = res.result.description;
        }
      });
    }
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
            this.product.pic = res;
            return api_PostMeetingProduct(this.product);
          })
          .then(() => {
            this.$toast(
              this.$route.params.productId == 0 ? "发布成功" : "编辑成功"
            );
            this.$router.go(-1);
          })
          .catch(() => {
            this.btnPosting = false;
          })
          .finally(() => {
            this.btnPosting = false;
            this.$router.go(-1);
          });
      } else {
        api_PostMeetingProduct(this.product)
          .then(() => {
            this.$toast(
              this.$route.params.productId == 0 ? "发布成功" : "编辑成功"
            );
            this.$router.go(-1);
          })
          .catch(() => {
            this.btnPosting = false;
          })
          .finally(() => {
            this.btnPosting = false;
            this.$router.go(-1);
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
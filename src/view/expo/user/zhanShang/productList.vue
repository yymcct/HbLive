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
    <div class="box">
      <div class="title">
        <span>管理产品：</span>
        <div class="selectall">
          <van-checkbox
            shape="square"
            name="item.id"
            v-model="checkAll"
            checked-color="#07c160"
            @click="checkAll ? $refs.checkboxGroup.toggleAll(false):$refs.checkboxGroup.toggleAll(true)"
          >全选</van-checkbox>
        </div>
        <img :src="require('@/assets/images/expo/delete.png')" @click="delProducts" />
      </div>
      <van-checkbox-group v-model="checkResult" ref="checkboxGroup">
        <div class="selectlist">
          <template v-for="(item, index) in products">
            <div class="selectcon" :key="index">
              <div class="selectck">
                <van-checkbox shape="square" :name="item.id" checked-color="#07c160">{{item.name}}</van-checkbox>
              </div>
              <div class="pic">
                <img
                  :src="require('@/assets/images/expo/edit.png')"
                  class="edit"
                  @click="$router.push(`/expo/${meetingId}/user/zhanshang/${item.companyId}/product/${item.id}`)"
                />
                <img :src="item.pic" />
              </div>
            </div>
          </template>
        </div>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  api_GetProductByIteam,
  api_DeleteMeetingProduct
} from "@/api/meetingApi";
export default {
  name: "",
  props: ["ProductList"],
  data() {
    return {
      checkResult: [],
      products: [],
      checkAll: false
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
    this.getProductByIteam();
  },

  methods: {
    getProductByIteam() {
      api_GetProductByIteam({
        Filters: "CompanyId==" + this.$route.params.companyId,
        PageSize: 50
      }).then(res => {
        this.products = res.result;
      });
    },
    delProducts() {
      if (this.checkResult.length == 0) {
        this.$toast("请选中要删除的产品");
        return;
      }
      this.$dialog
        .confirm({
          title: "危险操作",
          message: "确定要删除选中的产品?"
        })
        .then(() => {
          api_DeleteMeetingProduct({
            ids: this.checkResult
          }).then(() => {
            this.$toast("删除成功");
             this.getProductByIteam();
          });
         
        });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.wrapper {
  .box {
    background: #fff;
    .title {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 999;
      background: #fff;
      padding: 15px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid #efefef;
      font-size: 16px;
      img {
        width: 25px;
        height: 25px;
      }
    }
    .selectlist {
      margin: 60px 5% 0 5%;
      .selectcon {
        padding: 15px 0;
        border-bottom: 1px solid #efefef;
        .selectck {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          font-size: 16px;
        }
        .pic {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin-top: 20px;
          img {
            width: 90%;
            height: auto;
          }
          .edit {
            width: 25px !important;
            height: 25px !important;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
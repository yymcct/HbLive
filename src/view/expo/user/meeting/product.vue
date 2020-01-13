<template>
  <!-- 展品管理 -->
  <div class="wrapper">
    <div class="bar">
      <van-nav-bar :title="$route.meta.title" left-arrow @click-left="$router.go(-1)" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapGetters("meeting", {
      meetingId: "meetingId"
    })
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
</style>
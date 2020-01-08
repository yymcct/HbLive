<template>
  <div></div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    const isWeixin = () =>
      /micromessenger/.test(navigator.userAgent.toLowerCase());
    if (isWeixin()) {
      this.$router.push("/user/login/weixin");
    } else {
      this.$toast("请在微信中打开此网页");
    }
  },

  methods: {},

  watch: {}
};
</script>
<style lang='' scoped>
</style>
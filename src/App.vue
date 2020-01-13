<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  created() {
    const user = this.$globalFun.userInfoAPI.get();
    if (user) {
      this.$store.commit("user/setUser", user.member);
    }
  },
  mounted() {}
};
</script>

<style>
@import "common/scss/index.scss";
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
}
[v-cloak] {
  display: none;
}
</style>

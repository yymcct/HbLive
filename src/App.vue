<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  created() {
    console.log('父组件 读取query:')
    console.log(this.$route);
    if (this.$route.query.mId) {
      const id = this.$route.query.mId;      
      this.$store.dispatch("meeting/meetingId", id);
      console.log("父组件已经设定了"+id);
      console.log("父组件已经设定了"+this.$store.getters['meeting/meetingId']);
    }
  }
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

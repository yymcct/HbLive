<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  mounted() {
  },
  watch: {
    $route: function() {
      if (this.$route.query.mId) {
         const id = this.$route.query.mId;
         console.log(id);
         this.$store.dispatch("meeting/meetingId", id);
      }
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

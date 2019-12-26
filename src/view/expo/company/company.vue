<template>
  <div>Company{{meetingId}}-{{companyId}}</div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {
      meetingId: 0,
      companyId: 0
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.meetingId = this.$route.params.meetingId;
    this.companyId = this.$route.params.companyId;
  },

  methods: {},

  watch: {}
};
</script>
<style lang='' scoped>
</style>
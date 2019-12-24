 <template>
  <div>
    <hb-layout :active="0">
      <div class="box">
        <expo-top :meetingId="meetingId"></expo-top>
      </div>
    </hb-layout>
  </div>
</template>

<script>
import HbLayout from "@/components/layout/hbLayout";
import ExpoTop from "@/components/expo/top";
export default {
  name: "",
  props: {},
  data() {
    return {
      meetingId: 1
    };
  },

  components: {
    HbLayout,
    ExpoTop
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.meetingId = 1;
  },

  methods: {},

  watch: {
    $route() {
      this.meetingId = this.$route.params.id;
    }
  }
};
</script>
<style lang='' scoped>
</style>
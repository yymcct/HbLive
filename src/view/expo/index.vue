 <template>
  <div>
    <hb-layout :active="0">
      <div class="box">
        <expo-top :meetingId="curMeetingId"></expo-top>
      </div>
    </hb-layout>
  </div>
</template>

<script>
import HbLayout from "@/components/layout/hbLayout";
import ExpoTop from "@/components/expo/top";
export default {
  name: "",
  props: {
    meetingId: Number
  },
  data() {
    return {
      curMeetingId :1,
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

  watch: {}
};
</script>
<style lang='' scoped>
</style>
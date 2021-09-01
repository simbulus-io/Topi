import { Component, Vue } from 'vue-property-decorator';
import MainContent from '@/components/MainContent.vue';
import { AVTestState } from '@/store/avtest';
import {DeviceUtils} from '@/util/devices_util';

@Component({
  components: {
    MainContent,
  },
})

export default class Overview extends Vue {
  private recording_status = this.$store.getters['avtest/recording_status'];
  private operating_system = this.$store.getters['avtest/operating_system'];
  private browser = this.$store.getters['avtest/browser'];
  private video_status = this.$store.getters['avtest/video_status'];
  

}

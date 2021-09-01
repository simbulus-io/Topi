import { Component, Vue } from 'vue-property-decorator';
import MainContent from '@/components/MainContent.vue';
import {DeviceUtils} from '@/util/devices_util';
import { Device, enumerate_devices} from '@/util/avtest';

@Component({
  components: {
    MainContent,
  },
})

export default class DeviceTable extends Vue {

  public enumerated_devices: any;
  public updated = false;
  public all_devices: Device[] = [];

  public async created() {
    // console.log('DEVICE TABLE CREATED', this.$store.state.avtest.all_devices);
    this.all_devices = this.$store.state.avtest.all_devices;

    if (this.$route.query.faulty) {
      this.faulty_devices();
    }
  }

  public async mounted() {
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    // this.all_devices = await enumerate_devices();
    this.all_devices = await this.$store.state.avtest.all_devices;
    // console.log(this.enumerated_devices);
    // console.log('DEVICE TABLE MOUNTED', this.$store.state.avtest.all_devices);
    
    this.updated = true;
  }

  // Add '?faulty=TRUE' at the end of URL to force errors on random inputs
  public async faulty_devices() {
    this.all_devices.forEach((device: Device) => {
      const random_boolean = Math.random() >= 0.5;
      if (random_boolean) {
        device.status = 'Faulty';
      }
    });
  }

  get test() {
    return this.$store.state.avtest.all_devices;
  }

  public get audio_devices() {
    return DeviceUtils.audio_devices(this.test);
  }

  public get video_devices() {
    return DeviceUtils.videoDevices(this.test);
  }

}
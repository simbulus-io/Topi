/// <reference types="@types/dom-mediacapture-record" />
import { Component, Vue } from 'vue-property-decorator';
import MainContent from '@/components/MainContent.vue';
import {DeviceUtils} from '@/util/devices_util';
import { Device, enumerate_devices} from '@/util/avtest';
import { faTintSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  components: {
    MainContent,
  },
})

export default class VideoTest extends Vue {
  // $refs!: {
  //   videoElement: HTMLVideoElement,
  // };
  
  public stream!: MediaStream;
  // public all_devices: Device[] = [];
  public recorder!: MediaRecorder;
  public downloadURL = '';
  public video_selected = '';
  public video_devices: Device[] = [];
  public front_cam = true;

  private err_string = '';
  
  public async created() {
    this.video_devices = DeviceUtils.videoDevices(this.all_devices);
  }
  
  public get all_devices(): Device[] {
    return this.$store.state.avtest.all_devices;
  }

  public async video_success() {
    await this.$store.dispatch('avtest/video_status', 'User produced successful video stream.');
  }

  public async mounted() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: {deviceId: this.video_selected} });
    (this.$refs.videoElement as HTMLVideoElement).srcObject = this.stream;
    this.video_success();
  }

  public get output_options() {
    const videoDevices = DeviceUtils.videoDevices(this.all_devices);
    const opts: object[] = [];
    videoDevices.forEach((device) => {
      this.video_selected = device.deviceId;
      opts.push({value: device.deviceId, text: device.label});
    });
    // console.log(opts);
    return opts;
  }

  public async select_changed() {
    this.stream.getTracks().forEach(track => track.stop());

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: {deviceId: this.video_selected} });
    (this.$refs.videoElement as HTMLVideoElement).srcObject = this.stream;
    // if (this.stream) {
    //   this.stream.getTracks().forEach(track => track.stop());
    //   this.front_cam = !this.front_cam;
    // }
    // this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: 
    // { facingMode: (this.front_cam ? 'user' : 'environment'),
    //   deviceId: this.video_selected } } );
    // (this.$refs.videoElement as HTMLVideoElement).srcObject = this.stream;
  }
}

// this.stream.getTracks().forEach(track => track.stop());
//     try {
      
//     } catch (error) {
//       this.err_string = error;
//       console.log(error);
//     }
//     this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: 
//       {facingMode: 'environment'} });
//     (this.$refs.videoElement as HTMLVideoElement).srcObject = this.stream;

// try {
//   if (this.video_selected === '') {
//     this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: 
//       {facingMode: 'user'} });
//   } else {
//     this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: 
//       {deviceId: this.video_selected} });
//   }
// } catch (error) {
//   this.err_string = error;
// }
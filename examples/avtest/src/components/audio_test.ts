/// <reference types="@types/dom-mediacapture-record" />
import { Component, Vue } from 'vue-property-decorator';
import MainContent from '@/components/MainContent.vue';
import {DeviceUtils} from '@/util/devices_util';
import { Device, enumerate_devices} from '@/util/avtest';

@Component({
  components: {
    MainContent,
  },
})

export default class AudioTest extends Vue {
//  public all_devices: Device[] = [];
  public input_selected = 'default';
  public output_selected = 'default';

  public stream: MediaStream = new MediaStream();
  public recorder!: MediaRecorder;
  public blobURL = '';

  public record_variant = 'success';
  public record_button_text = 'Record';
  public record_disabled = false;

  public os_name = this.$store.getters['avtest/operating_system'].name;
  
  // Initialize devices, stream, and recorder
  public async created() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    this.recorder = new MediaRecorder(this.stream, { mimeType: 'audio/webm' });
  }

  public get all_devices(): Device[] {
    return this.$store.state.avtest.all_devices;
  }

  // Make an object array for audio inputs that the form select can deal with
  public get input_options() {
    const audioDevices = DeviceUtils.audio_devices(this.all_devices);
    const opts: object[] = [];
    audioDevices.forEach((device) => {
      opts.push({value: device.deviceId, text: device.label});
    });
    // console.log(opts);
    return opts;
  }

  // Make an object array for audio outputs that the form select can deal with
  public get output_options() {
    const audioDevices = DeviceUtils.audio_devices(this.all_devices);
    const opts: object[] = [];
    audioDevices.forEach((device) => {
      opts.push({value: device.deviceId, text: device.label});
    });
    // console.log(opts);
    return opts;
  }

  public async select_changed() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: {deviceId: this.input_selected}, video: false });
    this.recorder = new MediaRecorder(this.stream, { mimeType: 'audio/webm' });
  }

  public async recording_success() {
    await this.$store.dispatch('avtest/recording_status', 'User produced successful recording.');
  }

  public get show_recording() {
    if (this.os_name === 'iOS') {
      return false;
    } else {
      return true;
    }
  }

  // Record Audio. Listen for events. Update button and audio element. Win.
  public recordButton() {
    let chunks: BlobPart[] = [];
    this.blobURL = '';

    if (this.recorder.state === 'inactive') {
      // console.log('START RECORDING');
      this.record_variant = 'danger';
      this.record_button_text = 'Stop';
      chunks = [];
      this.recorder.start();
    } else {
      // console.log('STOP RECORDING');
      this.recorder.stop();
    }

    this.recorder.addEventListener('dataavailable', (event) => {
      if (typeof event.data === 'undefined') { console.error('event data was undefined'); return; }
      if (event.data.size === 0) { console.error('data size was 0'); return; }
      chunks.push(event.data);
    });

    this.recorder.addEventListener('stop', () => {
      this.record_variant = '';
      this.record_disabled = true;

      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      this.blobURL = URL.createObjectURL(audioBlob);
      // console.log('URL MADE', this.blobURL);

      this.record_disabled = false;
      this.record_variant = 'success';
      this.record_button_text = 'Record';
      
      this.recording_success();
    });
  }

  public get record_button_variant() {
    return this.record_variant;
  }

  public get record_button_status() {
    return this.record_disabled;
  }

}
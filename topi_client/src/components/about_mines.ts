import { Component, Vue } from 'vue-property-decorator';

declare const JitsiMeetExternalAPI: any;

@Component({
  components: {},
})
export default class AboutMines extends Vue {
  public message: string = 'A different message';

  public async created() {
    setTimeout(() => (this.message = 'And it changes'), 5000);
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'JitsiMeetAPIExample',
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet'),
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  }
}

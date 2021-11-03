import { Component, Vue } from 'vue-property-decorator';

declare const JitsiMeetExternalAPI: any;

@Component({
  components: {},
})
export default class AboutMines extends Vue {
  public message: string = 'A different message';

  public async created() {
    setTimeout(() => (this.message = 'And it changes'), 5000);
    window.onload = function() {
      const domain = 'meet.jit.si';
      const options = {
        roomName: 'TOPI',
        width: 700,
        height: 700,
        parentNode: document.querySelector('#meet'),
      };
      const api = new JitsiMeetExternalAPI(domain, options);
      api.addEventListener('participantRoleChanged', function($event:any) {
        if ($event.role === 'moderator') {
          api.executeCommand('password', 'The Password');
        }
      });
      // join a protected channel
      api.on('passwordRequired', function ()
      {
        api.executeCommand('password', 'The Password');
      });
    };
    
  }
}

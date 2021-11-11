import { Component, Vue } from 'vue-property-decorator';
// import {ElementRef} from '@angular/core'

 declare const JitsiMeetExternalAPI: any;


 @Component
export default class AboutMines extends Vue {

  public async created() {
    
    // window.onload = function() {
      const domain = 'meet.jit.si';
      const options = {
        roomName: 'TOPI',
        width: 300,
        height:300,
        location:300,
        parentNode: document.querySelector('#meet'),
      };
      // this.el = new ElementRef(document.getElementById("meet"))
      // this.el.nativeElement.style.top = "100";
      // this.el.nativeElement.style.left = "100";

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
    // };
    
  }
}

//  Vue.component('jitsi', {
//    data:function() {
//     const domain = 'meet.jit.si';
//     const options = {
//       roomName: 'TOPI',
//       width: 300,
//       height:300,
//       location: 100,
//       parentNode: document.querySelector('#meet'),
//     };
//     const api = new JitsiMeetExternalAPI(domain, options);
//     api.addEventListener('participantRoleChanged', function($event:any) {
//       if ($event.role === 'moderator') {
//         api.executeCommand('password', 'The Password');
//       }
//     });
//     // join a protected channel
//     api.on('passwordRequired', function ()
//     {
//       api.executeCommand('password', 'The Password');
//     });
//    }
//  })
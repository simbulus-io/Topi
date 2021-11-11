<template>
  <figure class="half" style="display:flex">
  <table>
    <tr>
      <td>
        <img style="height:50vh;width:75%;" src="https://www.mines.edu/wp-content/uploads/assets/logo_eee_4c_r.png">
      </td>
      <td>
         <vue-jitsi-meet
         style="height:50vh;width:25%;"
    ref="jitsiRef"
    domain="meet.jit.si"
    :options="jitsiOptions"
  ></vue-jitsi-meet>
      </td>
    </tr>
  </table>
</figure>
</template>

<script>
import { JitsiMeet } from '@mycure/vue-jitsi-meet';

export default {
  components: {
    VueJitsiMeet: JitsiMeet
  },
  computed: {
    jitsiOptions () {
      return {
        roomName: 'Topi',
        noSSL: false,
        width: 200,
        height:500,
        userInfo: {
          email: 'user@email.com',
          displayName: 'laura',
          
        },
        configOverwrite: {
          enableNoisyMicDetection: false
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_CHROME_EXTENSION_BANNER: false
        },
        onload: this.onIFrameLoad
      };
    },
  },
  
  methods: {
    onIFrameLoad () {
      this.$refs.jitsiRef.executeCommand('setTileView', true);
      this.$refs.jitsiRef.executeCommand('displayName', 'The display name');
    },
  },
};
</script>
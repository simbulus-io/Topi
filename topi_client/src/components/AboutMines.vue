<template>
  <figure class="half" style="display:flex">
  <table>
    <tr>
      <img class='img' src="https://www.mines.edu/wp-content/uploads/assets/logo_eee_4c_r.png">

      <div class='all'> 
        <div class='meet'>
          <vue-jitsi-meet
            style="display:block;position:absolute;"
            ref="jitsiRef"
            domain="meet.jit.si"
            :options="jitsiOptions"> 
          </vue-jitsi-meet>
        </div>
        <div class='whiteboard'>
          <div>WHITEBOARD LETS GO TOPI</div>
        </div>
      </div>
      
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
        width:700,
        height:800,
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

<style scoped>
  
  .img {
    margin: 0 auto;
    width: 50%;
    padding:0px 10px 30px
  }
  .meet {
    display: inline-block;
    border: 10px outset #04AA6D;
    width: 700px;
    height:800px;
    position: relative;
    left:-50px
  }
  .whiteboard {
    border: 10px outset #04AA6D;
    border-radius: 20px;
    width: 800px;
    height:800px;
    float:left;
    background-color:white;
  }

</style>
<template>
  <figure class="half" style="display:flex">
  <table>
    <!-- <tr> -->
      <img class='img' src="https://www.mines.edu/wp-content/uploads/assets/logo_eee_4c_r.png">

      <div class='all'> 
        <div class='meet'>
          <vue-jitsi-meet
            ref="jitsiRef"
            domain="meet.jit.si"
            :options="jitsiOptions"> 
          </vue-jitsi-meet>
        </div>

        <div class='whiteboard'>
        <div class='header'><div>WHITEBOARD LETS GO TOPI
      </div></div>
        
      </div>


      </div>
      
      
    <!-- </tr> -->
  </table>
</figure>
</template>

<script>
import { JitsiMeet } from '@mycure/vue-jitsi-meet';
import Vue from 'vue';

export default Vue.extend({
  components: {
    VueJitsiMeet: JitsiMeet
  },
  computed: {
    jitsiOptions () {
      return {
        roomName: 'Topi',
        noSSL: false,
        width:400,
        height:700,
        parentNode: document.querySelector('meet'),
        userInfo: {
          email: '',
          displayName: '',
          
        },
        configOverwrite: {
          enableNoisyMicDetection: false,
          
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          TILE_VIEW_MAX_COLUMNS: 3
        },
        onload: this.onIFrameLoad
      };
    },
  },
  
  methods: {
    onIFrameLoad () {
      this.$refs.jitsiRef.executeCommand('setTileView', true);
      this.$refs.jitsiRef.executeCommand('displayName', this.$store.state.user.email);
    },
    onParticipantJoined(e) {
      console.log('Someone joined')
    }
  },
});
</script>

<style scoped>
  
  .img {
    margin: 0 auto;
    width: 50%;
    padding:0px 10px 30px
  }
  .meet {
    /* position:fixed; */
    border: 10px outset #04AA6D;
    width: 400px;
    height:700px;
    float:right;
    border: 10px outset #04AA6D;
    border-radius: 20px;

    /* position: absolute; */
    /* left:1300px */
    
  }
  .whiteboard {
    border: 10px outset #04AA6D;
    background-color:white;
    border-radius: 20px;
    float:right;
    width: 700px;
    height:700px;
  }

</style>
<template>
  <figure class="half" style="display:flex">
      <div class='all'> 

        <div class='whiteboard'>
            <div class='meet'>
              <vue-jitsi-meet
                ref="jitsiRef"
                domain="meet.jit.si"
                :options="jitsiOptions"> 
              </vue-jitsi-meet>
            </div>
        </div>

      </div>
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
        width: 355,
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
  .all {
    width: 100%;
    min-height:100%;
  }
  .meet {
    width: 30%;
    height:95%;
    float:right;
    border: 10px green outset;
  }
  .whiteboard {
    border: 10px outset #04AA6D;
    background-color:white;
    border-radius: 20px;
    width: 100%;
    height: 100%;
  }

</style>
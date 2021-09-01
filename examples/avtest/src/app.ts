import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';

@Component({
  components: {
    Nav,
  },
})
export default class App extends Vue {
  // Yasi - This is where the server fetch gets initiated based on the value of the global Vue.$offline
  public async created() {
    if (Vue.$offline) {
      await this.$store.dispatch('avtest/fetch_state_from_server');
    } else {
      await this.$store.dispatch('avtest/fetch_state_from_local');
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      await this.$store.dispatch('avtest/enumerate_devices');
    }
  }

}
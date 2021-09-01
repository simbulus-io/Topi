import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class AboutMines extends Vue {

  public message: string = 'A different message';

  public async created() {
    setTimeout( () => this.message = 'And it changes', 5000);
  }

}

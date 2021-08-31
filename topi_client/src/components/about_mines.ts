import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class AboutMines extends Vue {

  public message: string = 'This is an example of a reactive data binding';

  public async created() {
    setTimeout( () => this.message = 'And it changes', 1000);
  }

}

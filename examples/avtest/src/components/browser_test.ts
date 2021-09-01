import browser_compat from '@/util/browser_compat.json';
import DeviceTable from '@/components/DeviceTable.vue';
import semver from 'semver';
import { AVTestState } from '@/store/avtest';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    DeviceTable,
  },
})

// SK-CR is Sean Code Review
// SK-VR is Sean Veux Refactor

// SK-CR - Use consistend casing for variable names - our team uses lower snake
// case for variable and function names in the style of C++

export default class BrowserInformation extends Vue {

  public window_width = window.screen.width;
  public window_height = window.screen.height;
  public browser_width = window.outerWidth;
  public browser_height = window.outerHeight;

  private next_button_visibility = true;
  private browser_alert: string = '';
  private browser_alert_color: string = '';

  // Gather browser information and compare against browser_compat.json
  public created() {
    this.init_banner();
  }

  // SK-VR
  private get compat_object() {
    return this.$store.getters['avtest/compat_object'];
  }
  // SK-VR
  private get operating_system() {
    return this.$store.getters['avtest/operating_system'];
  }
  // SK-VR
  private get browser() {
    return this.$store.getters['avtest/browser'];
  }

  // SK-CR some of this logic was inlined in created some was in this function
  // that I renamed to the below.  Generally I reserve nouns for getters --
  // hence the rename from browser_name to init_banner
  public init_banner() {
    const newer_ipad = (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    const is_ios = /iPhone|iPod|iPad/.test(window.navigator.userAgent) || newer_ipad;
    const browser_name = this.browser.name;
    // SK-CR - prefer string match for matching JS A or B or C
    if ((!is_ios && browser_name.match(/Chrome|Edge|Firefox/)) || (is_ios && browser_name.match(/safari/i))) {
      this.next_button_visibility = true;
      // SK-CR - prefer string interpolation
      // browser_alert = 'You are using ' + browser__name + '. Looks good!'  ;
      this.browser_alert = `You are using ${browser_name}. Looks good!`;
      this.browser_alert_color = 'alert alert-success';
    } else {
      const alternative = is_ios ? 'Please use Safari.' : 'Please consider trying a different browser.';
      this.browser_alert = 'You are using ' + this.browser.name + '. ' + alternative;
      this.browser_alert_color = 'alert alert-danger';
    }

    // SK-CR - casing and spelling corrected here
    const compat_object = this.compat_object;
    const curr_version = semver.coerce(compat_object.browser_version)?.version || '0.0.0';

    // SK-CR - we need to talk about this -- I think this code makes the else
    // clause above unnecessary
    browser_compat.incompatable.forEach((setting) => {
      if (compat_object.browser === setting.browser &&
          semver.intersects(curr_version, semver.validRange(setting.browser_version)) &&
          compat_object.platform === setting.platform ) {
            this.browser_alert = setting.message;
            this.browser_alert_color = 'alert alert-danger';
            this.next_button_visibility = false;
      }
    });
  }

  // SK-CR & SK-VR this getter is (arguably) extraneous
  // public get operating_system_name() {
  //   return this.operating_system;
  // }
  public get is_websocket_enabled() {
    if (window.WebSocket) {
      return true;
    } else {
      return false;
    }
  }

}

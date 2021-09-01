<template>
  <div>
    <!-- Sidenav for large screens -->
    <b-sidebar
      class="d-lg-flex d-xl-flex d-none d-sm-none"
      width="250px"
      z-index="1"
      no-header
      visible
      no-close-on-route-change>
        <b-nav vertical class="navigation text-left">
            <b-nav-item to="/" class="w-100 m-1"><h5><font-awesome-icon icon="tools" class="fa-fw mr-3"/>Browser Test</h5></b-nav-item>
            <b-nav-item to="/audio" :disabled="is_disabled" class="w-100 m-1"><h5><font-awesome-icon icon="microphone" class="fa-fw mr-3"/>Audio Test</h5></b-nav-item>
            <b-nav-item to="/video" :disabled="is_disabled" class="w-100 m-1"><h5><font-awesome-icon icon="video" class="fa-fw mr-3"/>Webcam Test</h5></b-nav-item>
            <b-nav-item to="/overview" class="w-100 m-1"><h5><font-awesome-icon icon="info-circle" class="fa-fw mr-3"/>Overview</h5></b-nav-item>
        </b-nav>
    </b-sidebar>

    <!-- Sidenav for small screens -->
    <b-sidebar
      class="mobile-sidenav"
      id="sidebar-1"
      width="250px" >
        <b-nav vertical class="navigation text-left">
            <b-nav-item to="/" class="w-100 m-1"><h5><font-awesome-icon icon="tools" class="fa-fw mr-3"/>Browser Test</h5></b-nav-item>
            <b-nav-item to="/audio" :disabled="is_disabled" class="w-100 m-1"><h5><font-awesome-icon icon="microphone" class="fa-fw mr-3"/>Audio Test</h5></b-nav-item>
            <b-nav-item to="/video" :disabled="is_disabled" class="w-100 m-1"><h5><font-awesome-icon icon="video" class="fa-fw mr-3"/>Webcam Test</h5></b-nav-item>
            <b-nav-item to="/overview" class="w-100 m-1"><h5><font-awesome-icon icon="info-circle" class="fa-fw mr-3"/>Overview</h5></b-nav-item>
        </b-nav>
    </b-sidebar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LeftNav extends Vue {
  public is_disabled = false;

  public created() {
    if (Vue.$offline) {
      this.is_disabled = true;
    }
  }
}
</script>


<style lang='scss'>
// Yasi - you are correct not to use scoped css for bootstrap overrides
// Yasi - prefer to scss variables for colors

@import "@/style/common.scss";

@media (min-width: 992px) {
  .mobile-sidenav {
    visibility: hidden;
  }

}
@media (min-width: 1200px) {
  .mobile-sidenav {
    visibility: hidden;
  }
}
.navigation {
  margin-top: 100px;
}
.b-sidebar-body {
  display:flex;
}
li > a.nav-link {
  color: grey;
}
li > a.nav-link.disabled {
  color: lightgrey;
}
.nav-link:hover {
  color: $woot_tutor_darkgray;
}
.nav-link:active {
  color: $woot_tutor_darkgray;
}
font-awesome-icon {
  width: 16px;
  height: 16px;
}
ul {
  display: flex;
  align-items: baseline;
}
</style>
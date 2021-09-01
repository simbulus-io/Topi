<template>
  <MainContent>
    <template v-slot:main-content>
      <div class='d-flex flex-column w-75'>
          <div class="align-self-center">
            <h1 class="text-left text-primary mt-4">OVERVIEW</h1>
            <!-- <div><b>Sesson ID: </b> Place Holder for Session ID</div> -->

            <h4 class="sub-head text-left mt-4 w-50">BROWSER</h4>
            <div class="info">
              <div> <b>Browser Name:</b> <br> {{browser.name}}</div>
              <br>
              <div> <b>Browser Version:</b> <br> {{browser.version}} </div>
            </div>

            <h4  class="sub-head text-left mt-4">DEVICE & SYSTEM</h4>
            <div class="info">
              <div> <b>Operating System:</b> <br> {{operating_system.name}} </div>
              <br>
              <div><b>Operating System Version:</b> <br> {{operating_system.version}}</div>
            </div>

            <h4  class="sub-head text-left mt-4">TEST RESULTS</h4>
            <div class="info">
                <div><b>Successful Recording?:</b> <br> {{recording_status}}</div>
                <br>
                <div><b>Successful Video?:</b> <br> {{video_status}}</div>
            </div>
            </div>
            </div>
    </template>
  </MainContent>
</template>

<script lang="ts" src="./overview.ts"></script>

<style lang="scss" scoped>
@import "@/style/common.scss";

.sub-head {
  color: $woot_tutor_brightblue;
}
.info {
  display:flex;
  flex-direction: column;
  padding-left: 2em;
}

@media (min-width: 576px) {
  br {
    display:none;
  }
}
</style>
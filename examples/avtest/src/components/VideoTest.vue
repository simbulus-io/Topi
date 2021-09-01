<template>
  <MainContent>
    <template v-slot:main-content>
      <div class='d-flex flex-column align-items-center w-75'>
        <h1 class='mt-5 text-center'>Test Your Video Devices</h1>
        <h6 class='mb-5 text-center'>Select the best camera and see your lovely face below.</h6>
        <div class='sizing'>
          <div class='d-flex flex-row flex-wrap align-items-center'>
            <h6 class='mr-2 text-nowrap'><b>Video Input:</b></h6>
            <b-form-select 
              class='mb-4' 
              v-model='video_selected' 
              :options='output_options'
              v-on:change='select_changed()'
              form-inline>
            </b-form-select>
            </div>
          <div>        
            <video ref='videoElement' autoplay playsinline muted></video>
          </div>
          </div>
          <b-button class='mt-4' variant='primary' to='/overview'>
                <b>Overview </b>
                <font-awesome-icon icon='chevron-right' />
          </b-button>
      </div>
    </template>
  </MainContent>
</template>

<script lang='ts' src='./video_test.ts'></script>

<style lang='scss' scoped>
@media (min-width: 576px) {
  .sizing {
    width: 50%;
  }
}

video {
  width: 100%;
}

.btn-primary {
    border-radius: 0;
    color: #fff;
    background-color: #544972;
    border-color: #544972;
    /*set the color you want here*/
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary.active,
.open>.dropdown-toggle.btn-primary {
    color: #fff;
    background-color: #f47321;
    border-color: #f47321;
    /*set the color you want here*/
}
</style>

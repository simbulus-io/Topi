<template>
  <MainContent>
    <template v-slot:main-content>
      <div class='d-flex flex-column align-items-center w-75'>
        <h1 class='mt-5 text-center'>Test Your Audio Devices </h1>
        <h6 class='mb-5 text-center'> Change your audio input and output to find which microphone or speaker works best.</h6>
        <div class='sizing align-items-center'>
          <div class='d-flex flex-row flex-wrap align-items-center'>
            <h6 class='mr-2 text-nowrap'> <b>Audio Output:</b></h6>
            <b-form-select
              class='mb-4'
              v-model='output_selected'
              :options='output_options'
              v-on:change='select_changed()'
              form-inline>
            </b-form-select>
          </div>

          <div class='output-devices d-flex flex-row flex-wrap align-items-center'>
            <h6 class=' mr-2 text-nowrap w-25'> <b>Audio Input:</b></h6>
            <b-form-select v-model='input_selected' :options='input_options' v-on:change='select_changed()' class='mb-4'></b-form-select>
          </div>

          <div>
            <av-media type='frequ' :media='stream' line-color='#519fe4'/>
          </div>

          <div class='recording-tools d-flex flex-wrap flex-row justify-content-center' v-if='show_recording'>
            <b-button class='m-2'
                      :variant='record_button_variant' 
                      :disabled='record_button_status' 
                      v-on:click='recordButton()'> {{record_button_text}} </b-button>
            <audio class='audio-container m-2' controls ref='audio' :src='blobURL'></audio>
          </div>
        </div>
        <b-button class='mt-4' variant='primary' to='/video'>
                <b>Next Test </b>
                <font-awesome-icon icon='chevron-right' />
        </b-button>
      </div>
    </template>
  </MainContent>
</template>

<script lang='ts' src='./audio_test.ts'></script>
<!-- don't use scoped css to try and override bootstrap styling -->
<style lang='scss'>
.btn {
    &.m-2 {
        width: 120px;
        height: 50px;
    }
}
</style>

<style scoped lang='scss'>
@media (min-width: 576px) {
  .sizing {
    text-align: center; //for the audio visualizer for some reason
    width: 50%;
  }
  .recording-tools {
    flex-wrap: nowrap !important;
  }
}

.sizing {
  text-align: center; //for the audio visualizer for some reason
}

audio,
audio:hover,
audio:focus,
audio:active {
    outline: none;
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

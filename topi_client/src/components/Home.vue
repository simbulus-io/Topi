<template>
  <div>
    <div class="welcome-topi">
      <h1>Welcome to the TOPI project</h1>
    </div>
    <div class="creators">
      <div>
        <img class="pic" src='../assets/pfp.png'>
        <h3>KF</h3>
      </div>
      <div>
        <img class="pic" src='../assets/pfp.png'>
        <h3>DA</h3>
      </div>
      <div>
        <img class="pic" src='../assets/pfp.png'>
        <h3>LB</h3>
      </div>
      <div>
        <img class="pic" src='../assets/pfp.png'>
        <h3>AJ</h3>
      </div>
      
      
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export default class Home extends Vue {}
</script>

<style scoped>
.creators {
  display:inline-flex;
}
.pic {
  padding: 9px;
}


</style>

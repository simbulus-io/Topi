<template>
    <div class="main-content">
      <slot name="main-content"></slot>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    @Component
    export default class MainContent extends Vue {}
</script>

<style scoped>
.main-content {
        display: flex;
        justify-content: center;
        margin-top: 56px;
}
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .main-content {
        display: flex;
        justify-content: center;
        margin-top: 56px;
    }
}
/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) { 
  .main-content {
        display: flex;
        justify-content: center;
        margin-top: 56px;
    }
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .main-content {
        display: flex;
        justify-content: center;
        margin-left: 250px;
        margin-top: 56px;
    }
}
 
/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .main-content {
        display: flex;
        justify-content: center;
        margin-left: 250px;
        margin-top: 56px;
    }
}   
</style>
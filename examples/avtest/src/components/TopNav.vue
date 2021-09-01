<template>
    <div class="top-nav">
        <b-navbar type="dark" variant="primary" fixed="top">
            <b-button v-b-toggle.sidebar-1 variant="primary" class="mr-2 d-lg-none d-xl-none">
                <font-awesome-icon icon="bars"/>
            </b-button>
            <b-navbar-brand href="#">AV Test</b-navbar-brand>
    
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class TopNav extends Vue {}
</script>

<style>
.top-nav {
    width: 100%;
}
</style>

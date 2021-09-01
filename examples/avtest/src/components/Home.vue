<template>
  <MainContent>
    <template v-slot:main-content>
      <BrowserTest/>
    </template>
  </MainContent>
</template>

<script>
import BrowserTest from '@/components/BrowserTest.vue';
import MainContent from '@/components/MainContent.vue';
export default {
  name: 'Home',
  components: {
    BrowserTest,
    MainContent,
  },
};
</script>
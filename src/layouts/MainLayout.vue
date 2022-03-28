<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-page-container style="background: #05c3dd"> -->
    <q-page-container class="bg-image">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {};
  },
});
</script>

<style scoped>
.bg-image {
  background-image: url('../assets/background-main-page.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
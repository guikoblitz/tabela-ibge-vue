<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-page-container style="background: #05c3dd"> -->
    <q-page-container>
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

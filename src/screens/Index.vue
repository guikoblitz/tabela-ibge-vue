<template>
  <q-page class="row items-center justify-evenly"> </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IbgeService from 'src/services/IbgeService';

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {};
  },
  async mounted(): Promise<void> {
    console.log('Teste');
    const teste = await IbgeService.getStates();
    console.log(teste);
  },
});
</script>

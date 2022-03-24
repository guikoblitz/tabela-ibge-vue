import { getDistrictsByState, getStates } from 'src/services/IbgeService';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainPage',
  data() {
    return {};
  },
  async mounted(): Promise<void> {
    console.log('TESTE');
    const teste = await getStates();
    console.log(teste);

    const teste2 = await getDistrictsByState(41);
    console.log(teste2);
  },
});

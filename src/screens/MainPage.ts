import { Loading, QTable } from 'quasar';
import lodash from 'lodash';
import { onMounted, reactive } from 'vue';
import { State } from 'src/common/interfaces/State';
import { getStatesUseCase } from 'src/useCases/StateUseCase';
import { District } from 'src/common/interfaces/District';
import { getDistrictsByStateUseCase } from 'src/useCases/DistrictUseCase';

export default {
  setup() {
    const state = reactive({
      selectedState: null as State | null,
      stateOptions: [] as State[],
      stateData: [] as District[],
    });
    const districtsTableColumns = [
      {
        name: 'name',
        align: 'left',
        label: 'NOME',
        headerStyle: 'min-width: 140px',
        required: true,
      },
      {
        name: 'ibgeCode',
        align: 'left',
        label: 'CÓDIGO IBGE',
        headerStyle: 'min-width: 140px',
        required: true,
      },
    ] as QTable['columns'];

    onMounted(async () => {
      state.stateOptions = await getStatesUseCase();
    });

    async function selectState(): Promise<void> {
      if (state.selectedState) {
        Loading.show({ message: 'Carregando Distritos...' });
        const stateDistricts = await getDistrictsByStateUseCase(state.selectedState.id);
        if (stateDistricts) state.stateData = lodash.cloneDeep(stateDistricts);

        console.log(state.stateData);
        Loading.hide();
      }
    }

    function selectDistrict(district: District): void {
      console.log(district);
    }

    return { state, districtsTableColumns, selectState, selectDistrict };
  },
};

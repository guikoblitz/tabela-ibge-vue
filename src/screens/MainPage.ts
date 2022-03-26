import { Loading, QTable } from 'quasar';
import lodash from 'lodash';
import { onMounted, reactive } from 'vue';
import { State } from 'src/common/interfaces/State';
import { getStatesUseCase } from 'src/useCases/StateUseCase';
import { District } from 'src/common/interfaces/District';
import { getDistrictsByStateUseCase } from 'src/useCases/DistrictUseCase';
import DistrictModal from 'src/modals/DistrictModal.vue';
import { removeAccentuation } from 'src/util/GeneralUtil';

export default {
  components: {
    DistrictModal,
  },
  setup() {
    const state = reactive({
      selectedState: null as State | null,
      selectedDistrict: null as District | null,
      stateOptions: [] as State[],
      stateData: [] as District[],
      showDistrict: false,
    });
    const districtsTableColumns = [
      {
        name: 'name',
        align: 'left',
        label: 'NOME',
        headerStyle: 'min-width: 140px',
        required: true,
        sortable: true,
      },
      {
        name: 'ibgeCode',
        align: 'left',
        label: 'CÓDIGO IBGE',
        headerStyle: 'min-width: 140px',
        required: true,
        sortable: true,
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
        Loading.hide();
      }
    }

    function selectDistrict(district: District): void {
      state.selectedDistrict = lodash.cloneDeep(district);
      state.showDistrict = true;
    }

    function sortDistricts(districts: District[], sortBy: string, descending: boolean) {
      const sortedData = lodash.cloneDeep(districts);

      if (sortBy) {
        sortedData.sort((a, b) => {
          const districtX = descending ? b : a;
          const districtY = descending ? a : b;

          const districtXName = removeAccentuation(districtX.name);
          const districtYName = removeAccentuation(districtY.name);

          if (sortBy === 'name') {
            return districtXName > districtYName ? 1 : districtXName < districtYName ? -1 : 0;
          } else {
            return parseFloat(districtX.id) - parseFloat(districtY.id);
          }
        });
      }
      return sortedData;
    }

    return { state, districtsTableColumns, selectState, selectDistrict, sortDistricts };
  },
};

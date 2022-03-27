import { Loading, QTable } from 'quasar';
import lodash from 'lodash';
import { onBeforeMount, onMounted, reactive } from 'vue';
import { State } from 'src/common/interfaces/State';
import { getStatesUseCase } from 'src/useCases/StateUseCase';
import { District } from 'src/common/interfaces/District';
import { getDistrictsByStateUseCase } from 'src/useCases/DistrictUseCase';
import DistrictModal from 'src/modals/DistrictModal.vue';
import { removeAccentuation } from 'src/util/GeneralUtil';
import { ResizeObserverType } from 'src/common/interfaces/ResizeObserverType';

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
      isMobile: false,
      heightLogo: 0,
      heightSelect: 0,
      heightPage: 0,
      tableHeight: 0,
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

    onBeforeMount(() => {
      if (screen.width <= 760) {
        state.isMobile = true;
      }
    });

    onMounted(async () => {
      state.stateOptions = await getStatesUseCase();
    });

    async function selectState(): Promise<void> {
      if (state.selectedState) {
        Loading.show({ message: 'Carregando Distritos...' });
        const bottomPadding = state.isMobile ? 24 : 16;
        state.tableHeight = state.heightPage - state.heightLogo - state.heightSelect - bottomPadding - 32;
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

    function recalculateTableHeight(): void {
      const bottomPadding = state.isMobile ? 24 : 16;
      state.tableHeight = state.heightPage - state.heightLogo - state.heightSelect - bottomPadding - 32;
    }

    function handleResizeLogo(resizeObserver: ResizeObserverType): void {
      state.heightLogo = resizeObserver.height;
      console.log(1);
      recalculateTableHeight();
    }

    function handleResizeSelect(resizeObserver: ResizeObserverType): void {
      state.heightSelect = resizeObserver.height;
      console.log(2);
      recalculateTableHeight();
    }

    function handleResizePage(): void {
      state.heightPage = window.innerHeight;

      if (screen.width <= 720) {
        state.isMobile = true;
      } else {
        state.isMobile = false;
      }
    }

    return {
      state,
      districtsTableColumns,
      selectState,
      selectDistrict,
      sortDistricts,
      handleResizeLogo,
      handleResizeSelect,
      handleResizePage,
    };
  },
};

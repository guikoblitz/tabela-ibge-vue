import { Loading, QTable } from 'quasar';
import lodash from 'lodash';
import { onBeforeMount, onMounted, reactive } from 'vue';
import { State } from 'src/common/interfaces/State';
import { getStatesUseCase } from 'src/useCases/StateUseCase';
import { District } from 'src/common/interfaces/District';
import { getDistrictsByStateUseCase } from 'src/useCases/DistrictUseCase';
import InformationModal from 'src/modals/InformationModal.vue';
import { removeAccentuation } from 'src/util/GeneralUtil';
import { ResizeObserverType } from 'src/common/interfaces/ResizeObserverType';
import { City } from 'src/common/interfaces/City';

export default {
  components: {
    InformationModal,
  },
  setup() {
    const state = reactive({
      selectedState: null as State | null,
      selectedRow: null as District | City | null,
      stateOptions: [] as State[],
      stateData: [] as District[] | City[],
      showModal: false,
      isMobile: false,
      returnCities: true,
      heightLogo: 0,
      heightSelect: 0,
      heightPage: 0,
      tableHeight: 0,
    });
    const tableColumns = [
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
        Loading.show({ message: 'Carregando Cidades...' });
        const stateData = await getDistrictsByStateUseCase(state.selectedState.id, state.returnCities);
        if (stateData) state.stateData = lodash.cloneDeep(stateData);
        Loading.hide();
      }
    }

    function selectDistrictOrCity(selection: District | City): void {
      state.selectedRow = lodash.cloneDeep(selection);
      state.showModal = true;
    }

    function sortTable(rows: District[] | City[], sortBy: string, descending: boolean) {
      const sortedData = lodash.cloneDeep(rows);

      if (sortBy) {
        sortedData.sort((a, b) => {
          const rowX = descending ? b : a;
          const rowY = descending ? a : b;

          const rowXName = removeAccentuation(rowX.name);
          const rowYName = removeAccentuation(rowY.name);

          if (sortBy === 'name') {
            return rowXName > rowYName ? 1 : rowXName < rowYName ? -1 : 0;
          } else {
            return parseFloat(rowX.id) - parseFloat(rowY.id);
          }
        });
      }
      return sortedData;
    }

    function recalculateTableHeight(): void {
      state.tableHeight = state.heightPage - state.heightLogo - state.heightSelect - 16 - 40;
    }

    function handleResizeLogo(resizeObserver: ResizeObserverType): void {
      state.heightLogo = resizeObserver.height;
      recalculateTableHeight();
    }

    function handleResizeSelect(resizeObserver: ResizeObserverType): void {
      state.heightSelect = resizeObserver.height;
      recalculateTableHeight();
    }

    function handleResizePage(): void {
      state.heightPage = window.innerHeight;

      if (screen.width <= 720) {
        state.isMobile = true;
      } else {
        state.isMobile = false;
      }

      recalculateTableHeight();
    }

    return {
      state,
      tableColumns,
      selectState,
      selectDistrictOrCity,
      sortTable,
      handleResizeLogo,
      handleResizeSelect,
      handleResizePage,
    };
  },
};

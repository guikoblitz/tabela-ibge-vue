import { Loading, QTable } from 'quasar';
import lodash from 'lodash';
import { getCurrentInstance, onBeforeMount, onMounted, reactive } from 'vue';
import { State } from 'src/common/interfaces/State';
import { getStatesUseCase } from 'src/useCases/StateUseCase';
import { District } from 'src/common/interfaces/District';
import { getDistrictsByStateUseCase } from 'src/useCases/DistrictUseCase';
import InformationModal from 'src/modals/InformationModal.vue';
import { removeAccentuation } from 'src/util/GeneralUtil';
import { ResizeObserverType } from 'src/common/interfaces/ResizeObserverType';
import { City } from 'src/common/interfaces/City';
import Storage from 'src/util/LocalStorageUtil';

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
      widthPage: 0,
      globalProperties: null as any,
    });
    const tableColumns = [
      {
        name: 'name',
        align: 'left',
        label: 'NOME',
        required: true,
        sortable: true,
      },
      {
        name: 'ibgeCode',
        align: 'left',
        label: 'CÓDIGO IBGE',
        required: true,
        sortable: true,
      },
    ] as QTable['columns'];

    const pagination = { rowsPerPage: 0 };
    const app = getCurrentInstance();
    const storage = new Storage();

    onBeforeMount(async () => {
      if (screen.width <= 760) {
        state.isMobile = true;
      }

      if (app) {
        state.globalProperties = app.appContext.config.globalProperties;
        const selectedCitiesDB = (await storage.get('selectedCities')) as City[];
        if (selectedCitiesDB && selectedCitiesDB.length > 0)
          state.globalProperties.$store.dispatch('general/setSelectedCities', selectedCitiesDB);
      }
    });

    onMounted(async () => {
      state.stateOptions = await getStatesUseCase();
    });

    async function selectState(): Promise<void> {
      if (state.selectedState) {
        Loading.show({ message: 'Carregando Cidades...' });
        const selectedCities = state.globalProperties.$store.state.general.selectedCities;
        const stateData = await getDistrictsByStateUseCase(state.selectedState.id, selectedCities, state.returnCities);
        if (stateData) state.stateData = lodash.cloneDeep(stateData);
        Loading.hide();
      }
    }

    function removeSelectedCity(selection: District | City): void {
      selection.selected = false;
      state.globalProperties.$store.dispatch('general/dropSelectedCity', selection);
    }

    function selectDistrictOrCity(selection: District | City): void {
      if (!selection.selected) selection.selected = true;
      state.selectedRow = lodash.cloneDeep(selection);
      state.globalProperties.$store.dispatch('general/pushSelectedCity', state.selectedRow);
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

    function handleResizePage(resizeObserver: ResizeObserverType): void {
      state.heightPage = window.innerHeight;
      state.widthPage = resizeObserver.width;

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
      pagination,
      selectState,
      removeSelectedCity,
      selectDistrictOrCity,
      sortTable,
      handleResizeLogo,
      handleResizeSelect,
      handleResizePage,
    };
  },
};

<template>
  <q-page id="qPage" :class="state.isMobile ? 'q-px-md q-pt-sm' : 'side-spacing q-pt-sm'" style="background: #fafafa">
    <q-resize-observer @resize="handleResizePage" />
    <div class="q-pa-md center">
      <q-resize-observer @resize="handleResizeLogo" />
      <div :style="state.isMobile ? 'width: 60%' : 'width: 40%'">
        <q-img src="../assets/ibge-logo.png" class="col-4" />
      </div>
    </div>
    <div :class="state.stateData && state.stateData.length > 0 ? 'q-px-sm q-pt-sm' : 'q-pa-sm'">
      <q-resize-observer @resize="handleResizeSelect" />
      <q-select
        ref="stateSelector"
        label="UF"
        v-model="state.selectedState"
        :options="state.stateOptions"
        outlined
        option-value="id"
        option-label="label"
        dense
        transition-show="flip-up"
        transition-hide="flip-down"
        @update:model-value="selectState()"
      />
    </div>
    <div v-if="state.stateData && state.stateData.length > 0" class="q-px-sm q-pb-sm">
      <div class="q-py-xs">
        <span class="text-h6" style="color: #004f88">{{
          `${state.returnCities ? 'Cidades' : 'Distritos'} da UF ${
            state.isMobile ? state.selectedState.abbreviation : state.selectedState.name
          } - Dados IBGE`
        }}</span>
      </div>
      <q-table
        ref="dataTable"
        :style="`height: ${state.tableHeight}px`"
        class="sticky-scroll-header"
        :columns="tableColumns"
        :rows="state.stateData"
        :sort-method="sortTable"
        row-key="name"
        dense
        virtual-scroll
        :pagination="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="selectDistrictOrCity(props.row)" style="font-weight: 500; cursor: pointer">
            <q-td key="name" :props="props" :style="`min-width: 150px; max-width: 150px`">
              {{ props.row.name }}
              <q-icon
                v-if="props.row.selected"
                name="grade"
                color="orange"
                class="q-pl-sm"
                size="xs"
                @click.stop="removeSelectedCity(props.row)"
              >
                <q-tooltip anchor="top right" content-style="font-size: 12px" self="center middle">
                  <strong>Remover de cidades selecionadas</strong>
                </q-tooltip>
              </q-icon>
            </q-td>
            <q-td key="ibgeCode" :props="props">
              {{ props.row.id }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div v-else class="q-pa-sm text-center">
      <div>
        <q-img
          src="../assets/empty-table.svg"
          fit="fill"
          :style="state.isMobile ? 'height: 25vh; width: 50vw' : 'height: 35vh; width: 45vw'"
        />
      </div>
      <div class="q-pt-sm">
        <span class="text-h6 text-primary">Nenhuma UF selecionada... :(</span>
      </div>
    </div>
    <InformationModal
      v-if="state.showModal"
      :showModal="state.showModal"
      :selectedRow="state.selectedRow"
      :isMobile="state.isMobile"
      @closeModal="state.showModal = $event"
    />
  </q-page>
</template>

<script src="./MainPage.ts" />

<style>
.side-spacing {
  margin-left: 20%;
  margin-right: 20%;
}

.center {
  display: flex;
  justify-content: center;
}

.sticky-scroll-header tr th {
  position: sticky;
  z-index: 1;
  background: #004f88;
}

.sticky-scroll-header tr:first-child th {
  top: 0;
}
</style>

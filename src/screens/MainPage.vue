<template>
  <q-page id="qPage" :class="state.isMobile ? 'q-px-md q-pt-sm' : 'side-spacing q-pt-sm'" style="background: white">
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
      <div>
        <span class="text-h6 text-primary q-py-xs">{{ `Distritos da UF ${state.selectedState.name} - Dados IBGE` }}</span>
      </div>
      <q-table
        ref="districtsTable"
        :style="`height: ${state.tableHeight}px`"
        :columns="districtsTableColumns"
        :rows="state.stateData"
        :sort-method="sortDistricts"
        row-key="name"
        dense
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="selectDistrict(props.row)" style="font-weight: 500; cursor: pointer">
            <q-td key="name" :props="props">
              {{ props.row.name }}
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
    <DistrictModal
      v-if="state.showDistrict"
      :showDistrict="state.showDistrict"
      :selectedDistrict="state.selectedDistrict"
      @closeModal="state.showDistrict = $event"
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
</style>

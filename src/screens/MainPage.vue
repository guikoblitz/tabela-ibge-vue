<template>
  <q-page class="side-spacing" style="background: white">
    <div class="q-pa-sm center">
      <div style="width: 40%; heigth: 100px">
        <q-img src="../assets/ibge-logo.png" class="col-4" />
      </div>
    </div>
    <div class="q-pa-sm">
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
    <div v-if="state.stateData && state.stateData.length > 0" class="q-pa-sm">
      <q-table ref="districtsTable" title="Dados IBGE" :columns="districtsTableColumns" :rows="state.stateData" row-key="name" dense>
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
        <span class="text-h6 text-primary">Nenhuma UF selecionada... :(</span>
      </div>
      <div>
        <q-img src="../assets/empty-table.svg" style="height: 30vh; width: 30vw" />
      </div>
    </div>
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

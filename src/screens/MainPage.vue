<template>
  <q-page class="q-py-lg side-spacing">
    <div>
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
    <div class="q-pt-sm" v-if="state.stateData && state.stateData.length > 0">
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
    <div class="q-pt-sm" v-else>Não tem tabela</div>
  </q-page>
</template>

<script src="./MainPage.ts" />

<style>
.side-spacing {
  padding-left: 150px;
  padding-right: 150px;
}
</style>

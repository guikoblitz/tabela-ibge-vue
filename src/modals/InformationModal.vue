<template>
  <q-dialog v-model="showModal" persistent color="warning">
    <q-card style="width: 400px; height: 200px">
      <q-card-section class="row q-pa-sm" style="display: flex; justify-content: space-between; background: #004f88">
        <div class="text-h6 text-center">
          <span class="text-weight-bold" style="color: white">{{ `${selectedRow.name} - ${selectedRow.id}` }}</span>
        </div>
        <q-btn style="height: 34px; width: 34px" icon="close" color="white" flat round dense @click="closeModal()" />
      </q-card-section>
      <!-- <q-separator color="black" /> -->
      <q-card class="q-pa-sm scroll background-color-modal" style="max-height: 70vh">
        <span class="text-h6 text-primary">Teste</span>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script src="./InformationModal.ts" />
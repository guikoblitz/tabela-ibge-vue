<template>
  <q-dialog v-model="showDistrict" persistent color="warning">
    <q-card style="width: 400px; height: 200px">
      <q-card-section class="row q-pa-sm" style="display: flex; justify-content: space-between">
        <div class="text-h6 text-center">
          <span class="text-weight-bold" style="color: black">{{ `${selectedDistrict.name} - ${selectedDistrict.id}` }}</span>
        </div>
        <q-btn style="height: 34px; width: 34px" icon="close" color="negative" flat round dense @click="closeModal()" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./DistrictModal.ts" />
<template>
  <q-dialog v-model="showModal" persistent color="warning">
    <q-card :style="isMobile ? 'width: 90vw' : 'width: 560px'" style="border-radius: 15px; background: #004f88">
      <q-card-section class="row q-pa-sm" style="display: flex; justify-content: space-between; background: #004f88">
        <div class="text-h6 text-center">
          <span class="text-weight-bold" style="color: white">Informações</span>
        </div>
        <q-btn style="height: 34px; width: 34px" icon="close" color="white" flat round dense @click="closeModal()" />
      </q-card-section>
      <q-card class="q-pa-sm scroll background-color-modal bg-image" style="max-height: 70vh">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-6 row">
            <div class="col-12 col-md-12">
              <span class="text-h6 text-primary">Nome/Código IBGE</span>
            </div>
            <div class="col-12 col-md-12">
              <span class="text-primary font-informations">{{ selectedRow.name + ' - ' + selectedRow.id }}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 row">
            <div class="col-12 col-md-12">
              <span class="text-h6 text-primary">UF</span>
            </div>
            <div class="col-12 col-md-12">
              <span class="text-primary font-informations">{{
                selectedRow.microRegion.mesoRegion.uf.abbreviation + ' - ' + selectedRow.microRegion.mesoRegion.uf.name
              }}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 row">
            <div class="col-12 col-md-12">
              <span class="text-h6 text-primary">Microrregião</span>
            </div>
            <div class="col-12 col-md-12">
              <span class="text-primary font-informations">{{ selectedRow.microRegion.name }}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 row">
            <div class="col-12 col-md-12">
              <span class="text-h6 text-primary">Mesorregião</span>
            </div>
            <div class="col-12 col-md-12">
              <span class="text-primary font-informations">{{ selectedRow.microRegion.mesoRegion.name }}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 row">
            <div class="col-12 col-md-12">
              <span class="text-h6 text-primary">Região Imediata</span>
            </div>
            <div class="col-12 col-md-12">
              <span class="text-primary font-informations">{{ selectedRow.immediateRegion.name }}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 row">
            <div class="col-12 col-md-12">
              <span class="text-h6 text-primary">Região Intermediária</span>
            </div>
            <div class="col-12 col-md-12">
              <span class="text-primary font-informations">{{ selectedRow.immediateRegion.intermediateRegion.name }}</span>
            </div>
          </div>
        </div>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script src="./InformationModal.ts" />

<style scoped>
.font-informations {
  font-weight: 400;
  font-size: 1.15em;
}

.bg-image {
  background-image: url('../assets/background-modal-2.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
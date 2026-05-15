<script setup lang="js">
defineEmits(['open-sensors', 'open-hrv', 'open-shifts']);
</script>

<template>
  <div class="flex flex-column gap-4">
    <pv-card class="border-left-3 border-red-500 shadow-2 bg-white">
      <template #content>
        <div class="flex justify-content-between align-items-center mb-3">
          <h4 class="m-0 text-gray-800 font-bold uppercase text-base tracking-wide">Mi Monitoreo de Cortisol</h4>
          <pv-badge value="ALERTA DE ESTRÉS" severity="danger" class="px-2 py-1"></pv-badge>
        </div>
        <div class="grid mb-4">
          <div class="col-6">
            <p class="m-0 text-sm text-gray-500 font-medium mb-1">Mi Estado Actual</p>
            <p class="m-0 font-bold text-red-500 text-lg">Fatiga Elevada</p>
          </div>
          <div class="col-6 text-right">
            <p class="m-0 text-sm text-gray-500 font-medium mb-1">Bioparche Activo</p>
            <p class="m-0 font-bold text-gray-800 text-lg">Sincronizado</p>
          </div>
        </div>
        <pv-button label="Revisar mis sensores" icon="pi pi-search" class="p-button-outlined p-button-danger font-bold" @click="$emit('open-sensors')" />
      </template>
    </pv-card>

    <pv-card class="border-left-3 border-yellow-500 shadow-2 bg-white">
      <template #content>
        <div class="flex justify-content-between align-items-center mb-3">
          <h4 class="m-0 text-gray-800 font-bold uppercase text-base tracking-wide">Mi Variabilidad Cardíaca (HRV)</h4>
          <pv-badge value="RIESGO MODERADO" severity="warning" class="px-2 py-1"></pv-badge>
        </div>
        <div class="grid mb-4">
          <div class="col-6">
            <p class="m-0 text-sm text-gray-500 font-medium mb-1">Mi Promedio Hoy</p>
            <p class="m-0 font-bold text-yellow-600 text-lg">50 ms (Bajo)</p>
          </div>
          <div class="col-6 text-right">
            <p class="m-0 text-sm text-gray-500 font-medium mb-1">Reloj Inteligente</p>
            <p class="m-0 font-bold text-gray-800 text-lg">Conectado</p>
          </div>
        </div>
        <pv-button label="Ver mi historial HRV" icon="pi pi-heart" class="p-button-outlined p-button-warning font-bold" @click="$emit('open-hrv')" />
      </template>
    </pv-card>
  </div>
</template>
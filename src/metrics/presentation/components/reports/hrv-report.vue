<script setup>
import { ref } from 'vue';

const myHrvHistory = ref([
  { time: '20:00 PM', value: '50 ms', status: 'Riesgo', severity: 'warning' },
  { time: '18:00 PM', value: '40 ms', status: 'Crítico', severity: 'danger' },
  { time: '16:00 PM', value: '45 ms', status: 'Riesgo', severity: 'warning' },
  { time: '14:00 PM', value: '55 ms', status: 'Estable', severity: 'success' },
  { time: '12:00 PM', value: '60 ms', status: 'Estable', severity: 'success' }
]);
</script>

<template>
  <pv-card class="shadow-none bg-white">
    <template #title><span class="text-gray-800 font-bold text-xl">Mi Historial HRV - Turno Actual</span></template>
    <template #content>
      <pv-data-table :value="myHrvHistory" class="p-datatable-lg custom-light-table" stripedRows responsiveLayout="scroll">
        <pv-column field="time" header="Hora de Lectura" headerStyle="font-weight: bold;"></pv-column>
        <pv-column field="value" header="Mi HRV Detectado" headerStyle="font-weight: bold;"></pv-column>
        <pv-column header="Evaluación de Fatiga" headerStyle="font-weight: bold;">
          <template #body="slotProps">
            <pv-badge :value="slotProps.data.status" :severity="slotProps.data.severity" class="px-3 py-2 text-base"></pv-badge>
          </template>
        </pv-column>
      </pv-data-table>
    </template>
  </pv-card>
</template>

<style scoped>
/* TRUCO CSS: Forzamos colores claros usando :deep() para penetrar el componente de PrimeVue */
:deep(.custom-light-table .p-datatable-header),
:deep(.custom-light-table .p-datatable-thead > tr > th) {
  background-color: #f9fafb !important;
  color: #374151 !important;
  border-color: #e5e7eb !important;
}

:deep(.custom-light-table .p-datatable-tbody > tr) {
  background-color: #ffffff !important;
  color: #4b5563 !important;
}

:deep(.custom-light-table .p-datatable-tbody > tr:nth-child(even)) {
  background-color: #f3f4f6 !important;
}

:deep(.custom-light-table .p-datatable-tbody > tr > td) {
  border-color: #e5e7eb !important;
}
</style>
<script setup>
import { ref } from 'vue';

const myShifts = ref([
  { date: 'Lun 18 Mayo', area: 'UCI Sur', hours: '12h (Día)', status: 'Recuperado' },
  { date: 'Mié 20 Mayo', area: 'Emergencias', hours: '12h (Noche)', status: 'Advertencia' },
  { date: 'Vie 22 Mayo', area: 'UCI Sur', hours: '24h (Guardia)', status: 'Crítico' },
  { date: 'Dom 24 Mayo', area: 'Descanso', hours: '0h', status: 'Recuperado' }
]);

const getSeverity = (status) => {
  if (status === 'Crítico') return 'danger';
  if (status === 'Advertencia') return 'warning';
  return 'success';
};
</script>

<template>
  <pv-card class="shadow-2 bg-white">
    <template #title><span class="text-gray-800 font-bold text-xl">Mi Calendario de Turnos y Fatiga Predictiva</span></template>
    <template #content>
      <pv-data-table :value="myShifts" stripedRows class="p-datatable-lg custom-light-table" responsiveLayout="scroll">
        <pv-column field="date" header="Fecha Programada" headerStyle="font-weight: bold;"></pv-column>
        <pv-column field="area" header="Área Asignada" headerStyle="font-weight: bold;"></pv-column>
        <pv-column field="hours" header="Duración" headerStyle="font-weight: bold;"></pv-column>
        <pv-column header="Mi Predicción de Fatiga" headerStyle="font-weight: bold;">
          <template #body="slotProps">
            <pv-badge :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" class="px-3 py-2 text-base"></pv-badge>
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
  background-color: #f3f4f6 !important; /* Color para las filas alternadas (stripedRows) */
}

:deep(.custom-light-table .p-datatable-tbody > tr > td) {
  border-color: #e5e7eb !important;
}
</style>
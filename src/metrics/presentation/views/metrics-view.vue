<script setup lang="js">

import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { metricsStore } from "../../application/metrics.store.js";
import useIamStore from "../../../iam/application/iam.store.js";
import StatCards from "../components/stat-cards.vue";
import BiometricModules from "../components/biometric-modules.vue";
import ActiveAlerts from "../components/active-alerts.vue";
import CortisolReport from "../components/reports/cortisol-report.vue";
import ShiftsTable from "../components/shifts/shifts-table.vue";
import HrvReport from "../components/reports/hrv-report.vue";

const { t } = useI18n();
const iamStore = useIamStore();

const activeTab = ref(0);
const adminActiveTab = ref(0);

const showSensorsModal = ref(false);
const showHrvModal = ref(false);

const allDoctors = ref([
  { id: 1, name: 'Dr. Jairo Atanacio', area: 'Emergencias', hrv: '45 ms', cortisol: '22 µg/dL', status: 'Crítico' },
  { id: 2, name: 'Dra. Ana Silva', area: 'UCI Sur', hrv: '55 ms', cortisol: '15 µg/dL', status: 'Advertencia' },
  { id: 3, name: 'Dr. Luis Torres', area: 'Pediatría', hrv: '70 ms', cortisol: '10 µg/dL', status: 'Estable' },
  { id: 4, name: 'Dra. María Gómez', area: 'Cirugía', hrv: '65 ms', cortisol: '12 µg/dL', status: 'Estable' }
]);

const getBadgeClass = (status) => {
  if (status === 'Crítico') return 'bg-red-100 text-red-700 border-1 border-red-200';
  if (status === 'Advertencia') return 'bg-orange-100 text-orange-700 border-1 border-orange-200';
  return 'bg-green-100 text-green-700 border-1 border-green-200';
};

const getTranslatedStatus = (status) => {
  if (status === 'Crítico') return 'critico';
  if (status === 'Advertencia') return 'advertencia';
  return 'estable';
};

onMounted(() => {
  metricsStore.loadDashboardData();
});
</script>

<template>
  <div class="metrics-view-wrapper w-full h-full">

    <!-- VISTA DOCTOR -->
    <div v-if="iamStore.isDoctor" class="flex flex-column h-full">
      <div class="bg-white border-bottom-1 border-gray-200 shadow-1 flex p-3 z-1 gap-4 overflow-x-auto">
        <div @click="activeTab = 0" :class="['px-4 py-2 border-round cursor-pointer transition-colors transition-duration-200 flex align-items-center', activeTab === 0 ? 'bg-cyan-50 text-cyan-700 font-bold shadow-1' : 'text-gray-600 hover:bg-gray-100']">
          <i class="pi pi-objects-column mr-2 text-xl"></i><span class="text-base">{{ t('metrics.doctor_tabs.summary') }}</span>
        </div>
        <div @click="activeTab = 1" :class="['px-4 py-2 border-round cursor-pointer transition-colors transition-duration-200 flex align-items-center', activeTab === 1 ? 'bg-cyan-50 text-cyan-700 font-bold shadow-1' : 'text-gray-600 hover:bg-gray-100']">
          <i class="pi pi-chart-bar mr-2 text-xl"></i><span class="text-base">{{ t('metrics.doctor_tabs.cortisol') }}</span>
        </div>
        <div @click="activeTab = 2" :class="['px-4 py-2 border-round cursor-pointer transition-colors transition-duration-200 flex align-items-center', activeTab === 2 ? 'bg-cyan-50 text-cyan-700 font-bold shadow-1' : 'text-gray-600 hover:bg-gray-100']">
          <i class="pi pi-calendar mr-2 text-xl"></i><span class="text-base">{{ t('metrics.doctor_tabs.shifts') }}</span>
        </div>
      </div>

      <div class="flex-grow-1 p-5 bg-gray-50 overflow-y-auto">
        <div class="max-w-screen-xl mx-auto">
          <div class="mb-4">
            <h1 class="m-0 text-3xl font-bold text-gray-800">
              {{ activeTab === 0 ? t('metrics.titles.doctor_summary') : (activeTab === 1 ? t('metrics.titles.doctor_cortisol') : t('metrics.titles.doctor_shifts')) }}
            </h1>
            <p class="text-gray-500 mt-2 text-sm">Monitor de Salud Ocupacional CortiSense</p>
          </div>

          <div v-if="activeTab === 0" class="fadein animation-duration-300">
            <stat-cards />
            <div class="grid mt-4">
              <div class="col-12 lg:col-7">
                <biometric-modules @open-sensors="showSensorsModal = true" @open-hrv="showHrvModal = true" />
              </div>
              <div class="col-12 lg:col-5 pl-0 lg:pl-5">
                <active-alerts />
              </div>
            </div>
          </div>
          <div v-if="activeTab === 1" class="fadein animation-duration-300"><cortisol-report /></div>
          <div v-if="activeTab === 2" class="fadein animation-duration-300"><shifts-table /></div>
        </div>
      </div>
    </div>

    <!-- VISTA ADMINISTRADOR -->
    <div v-else-if="iamStore.isAdmin" class="flex flex-column h-full">
      <div class="bg-white border-bottom-1 border-gray-200 shadow-1 flex p-3 z-1 gap-4 overflow-x-auto">
        <div @click="adminActiveTab = 0" :class="['px-4 py-2 border-round cursor-pointer transition-colors transition-duration-200 flex align-items-center', adminActiveTab === 0 ? 'bg-blue-50 text-blue-700 font-bold shadow-1' : 'text-gray-600 hover:bg-gray-100']">
          <i class="pi pi-users mr-2 text-xl"></i><span class="text-base">{{ t('metrics.admin_tabs.real_time') }}</span>
        </div>
        <div @click="adminActiveTab = 1" :class="['px-4 py-2 border-round cursor-pointer transition-colors transition-duration-200 flex align-items-center', adminActiveTab === 1 ? 'bg-blue-50 text-blue-700 font-bold shadow-1' : 'text-gray-600 hover:bg-gray-100']">
          <i class="pi pi-chart-line mr-2 text-xl"></i><span class="text-base">{{ t('metrics.admin_tabs.trends') }}</span>
        </div>
        <div @click="adminActiveTab = 2" :class="['px-4 py-2 border-round cursor-pointer transition-colors transition-duration-200 flex align-items-center', adminActiveTab === 2 ? 'bg-blue-50 text-blue-700 font-bold shadow-1' : 'text-gray-600 hover:bg-gray-100']">
          <i class="pi pi-chart-pie mr-2 text-xl"></i><span class="text-base">{{ t('metrics.admin_tabs.availability') }}</span>
        </div>
      </div>

      <div class="flex-grow-1 p-5 bg-gray-50 overflow-y-auto">
        <div class="max-w-screen-xl mx-auto w-full">
          <div class="mb-4 flex justify-content-between align-items-center">
            <div>
              <h1 class="m-0 text-3xl font-bold text-gray-800">{{ t('metrics.titles.admin_dashboard') }}</h1>
              <p class="text-gray-500 mt-2 text-sm">{{ t('metrics.titles.admin_subtitle') }}</p>
            </div>
            <pv-badge value="MODO ADMINISTRADOR" severity="info" class="px-3 py-2"></pv-badge>
          </div>

          <div v-if="adminActiveTab === 0" class="fadein animation-duration-300">
            <div class="grid mb-4">
              <div class="col-12 md:col-4">
                <pv-card class="shadow-1 border-1 border-gray-200 bg-white">
                  <template #content>
                    <div class="flex align-items-center">
                      <div class="p-3 bg-blue-50 border-round mr-3"><i class="pi pi-users text-blue-500 text-2xl"></i></div>
                      <div><p class="m-0 text-xs text-gray-500 font-bold uppercase">Médicos en Guardia</p><p class="m-0 font-bold text-2xl text-gray-800">42</p></div>
                    </div>
                  </template>
                </pv-card>
              </div>
              <div class="col-12 md:col-4">
                <pv-card class="shadow-1 border-1 border-gray-200 bg-white">
                  <template #content>
                    <div class="flex align-items-center">
                      <div class="p-3 bg-red-50 border-round mr-3"><i class="pi pi-exclamation-triangle text-red-500 text-2xl"></i></div>
                      <div><p class="m-0 text-xs text-gray-500 font-bold uppercase">Alertas Críticas</p><p class="m-0 font-bold text-2xl text-red-600">02</p></div>
                    </div>
                  </template>
                </pv-card>
              </div>
              <div class="col-12 md:col-4">
                <pv-card class="shadow-1 border-1 border-gray-200 bg-white">
                  <template #content>
                    <div class="flex align-items-center">
                      <div class="p-3 bg-green-50 border-round mr-3"><i class="pi pi-check-circle text-green-500 text-2xl"></i></div>
                      <div><p class="m-0 text-xs text-gray-500 font-bold uppercase">Estado Hospital</p><p class="m-0 font-bold text-2xl text-green-600">Estable</p></div>
                    </div>
                  </template>
                </pv-card>
              </div>
            </div>

            <pv-card class="shadow-2 bg-white">
              <template #title><span class="text-gray-800 font-bold text-xl">Monitoreo Detallado por Pabellón</span></template>
              <template #content>
                <div class="grid">
                  <div class="col-12 xl:col-4 border-right-1 border-gray-200 pr-4">
                    <h4 class="text-gray-600 mb-4 text-sm font-bold uppercase">Niveles de Estrés (Promedio)</h4>
                    <div class="flex flex-column gap-4">
                      <div><div class="flex justify-content-between text-xs font-bold mb-1"><span>EMERGENCIAS</span><span class="text-red-600">85%</span></div><div class="w-full h-1rem bg-gray-100 border-round overflow-hidden"><div class="bg-red-500 h-full" style="width: 85%"></div></div></div>
                      <div><div class="flex justify-content-between text-xs font-bold mb-1"><span>UCI SUR</span><span class="text-orange-600">60%</span></div><div class="w-full h-1rem bg-gray-100 border-round overflow-hidden"><div class="bg-orange-500 h-full" style="width: 60%"></div></div></div>
                      <div><div class="flex justify-content-between text-xs font-bold mb-1"><span>PEDIATRÍA</span><span class="text-green-600">35%</span></div><div class="w-full h-1rem bg-gray-100 border-round overflow-hidden"><div class="bg-green-500 h-full" style="width: 35%"></div></div></div>
                    </div>
                  </div>
                  <div class="col-12 xl:col-8 pl-4">
                    <pv-data-table :value="allDoctors" class="p-datatable-sm custom-light-table" stripedRows responsiveLayout="scroll">
                      <pv-column field="name" header="Médico" headerStyle="font-weight: bold; font-size: 13px;"></pv-column>
                      <pv-column field="area" header="Área" headerStyle="font-weight: bold; font-size: 13px;"></pv-column>
                      <pv-column field="hrv" header="HRV" headerStyle="font-weight: bold; font-size: 13px;"></pv-column>
                      <pv-column field="cortisol" header="Cortisol" headerStyle="font-weight: bold; font-size: 13px;"></pv-column>
                      <pv-column header="Estado Clínico" headerStyle="font-weight: bold; font-size: 13px;">
                        <template #body="slotProps">
                          <span :class="['px-3 py-1 border-round-xl text-xs font-bold', getBadgeClass(slotProps.data.status)]">
                            {{ t('metrics.status.' + getTranslatedStatus(slotProps.data.status)) }}
                          </span>
                        </template>
                      </pv-column>
                    </pv-data-table>
                  </div>
                </div>
              </template>
            </pv-card>
          </div>

          <div v-if="adminActiveTab === 1" class="fadein animation-duration-300">
            <pv-card class="shadow-2 bg-white">
              <template #title><span class="text-gray-800 font-bold text-xl">Estabilidad de HRV (Tendencia de 24h)</span></template>
              <template #content>
                <p class="text-gray-500 mb-4">La gráfica muestra el promedio de variabilidad cardíaca de todo el personal activo.</p>
                <div class="h-20rem w-full relative mt-4 border-bottom-1 border-left-1 border-gray-300 pb-2 pl-2">
                  <svg viewBox="0 0 1000 200" class="w-full h-full" preserveAspectRatio="none">
                    <path d="M0 150 Q 150 50 300 130 T 600 70 T 1000 100" fill="none" stroke="#0ea5e9" stroke-width="4" />
                    <path d="M0 150 Q 150 50 300 130 T 600 70 T 1000 100 V 200 H 0 Z" fill="rgba(14, 165, 233, 0.1)" />
                    <circle cx="600" cy="70" r="6" fill="#ef4444" />
                    <text x="615" y="75" fill="#ef4444" font-size="14" font-weight="bold">Pico de Fatiga (Cambio de Turno)</text>
                  </svg>
                  <div class="flex justify-content-between mt-2 text-xs text-gray-500 font-bold px-2">
                    <span>08:00 AM</span><span>12:00 PM</span><span>04:00 PM</span><span>08:00 PM</span><span>12:00 AM</span>
                  </div>
                </div>
              </template>
            </pv-card>
          </div>

          <div v-if="adminActiveTab === 2" class="fadein animation-duration-300">
            <pv-card class="shadow-2 bg-white">
              <template #title><span class="text-gray-800 font-bold text-xl">Distribución de Riesgo del Staff</span></template>
              <template #content>
                <div class="flex flex-column md:flex-row align-items-center justify-content-center gap-6 p-4">
                  <div class="shadow-2 border-circle overflow-hidden" style="width: 250px; height: 250px; background: conic-gradient(#10b981 0% 65%, #f97316 65% 85%, #ef4444 85% 100%);"></div>
                  <div class="flex flex-column gap-3">
                    <div class="flex align-items-center p-3 border-round bg-green-50 border-1 border-green-200">
                      <div class="w-1rem h-1rem bg-green-500 border-round mr-3"></div>
                      <div><p class="m-0 font-bold text-green-700">Óptimo para Guardia</p><p class="m-0 text-sm text-green-600">65% del personal</p></div>
                    </div>
                    <div class="flex align-items-center p-3 border-round bg-orange-50 border-1 border-orange-200">
                      <div class="w-1rem h-1rem bg-orange-500 border-round mr-3"></div>
                      <div><p class="m-0 font-bold text-orange-700">Fatiga Moderada</p><p class="m-0 text-sm text-orange-600">20% del personal</p></div>
                    </div>
                    <div class="flex align-items-center p-3 border-round bg-red-50 border-1 border-red-200">
                      <div class="w-1rem h-1rem bg-red-500 border-round mr-3"></div>
                      <div><p class="m-0 font-bold text-red-700">Riesgo / Burnout</p><p class="m-0 text-sm text-red-600">15% del personal</p></div>
                    </div>
                  </div>
                </div>
              </template>
            </pv-card>
          </div>
        </div>
      </div>
    </div>

    <!-- DIÁLOGOS MOVIDOS DENTRO DE LA RAÍZ -->
    <pv-dialog v-model:visible="showSensorsModal" modal header="Mis Dispositivos" :style="{ width: '30vw' }" contentClass="bg-white">
      <p class="m-0 text-gray-700">Sensores activos y sincronizados.</p>
    </pv-dialog>

    <pv-dialog v-model:visible="showHrvModal" modal header="Detalles HRV" :style="{ width: '50vw' }" contentClass="bg-white">
      <hrv-report />
    </pv-dialog>

  </div>
</template>

<style scoped>
:deep(.custom-light-table .p-datatable-header),
:deep(.custom-light-table .p-datatable-thead > tr > th) { background-color: #f8fafc !important; color: #475569 !important; border-bottom: 2px solid #e2e8f0 !important; }
:deep(.custom-light-table .p-datatable-tbody > tr) { background-color: #ffffff !important; color: #475569 !important; }
:deep(.custom-light-table .p-datatable-tbody > tr:nth-child(even)) { background-color: #f8fafc !important; }
:deep(.custom-light-table .p-datatable-tbody > tr > td) { border-color: #e2e8f0 !important; padding: 12px !important; font-size: 14px; }
</style>
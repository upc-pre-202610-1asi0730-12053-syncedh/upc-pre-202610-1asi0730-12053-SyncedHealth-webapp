<script setup lang="js">
import { computed } from "vue";
import { metricsStore } from "../../application/metrics.store.js";

const metrics = computed(() => metricsStore.metrics);

const getBadgeColor = (status) => {
  switch(status) {
    case 'success': return 'success';
    case 'danger': return 'danger';
    case 'warning': return 'warning';
    default: return 'info';
  }
};
</script>

<template>
  <div class="grid mb-4">
    <div v-for="metric in metrics" :key="metric.id" class="col-12 md:col-6 xl:col">
      <pv-card class="h-full border-1 border-gray-200 shadow-1 bg-white hover:shadow-3 transition-all transition-duration-200">
        <template #content>
          <div class="flex justify-content-between align-items-start mb-3">
            <div class="border-round p-3 flex align-items-center justify-content-center bg-cyan-50" style="border-radius: 12px;">
              <i :class="['pi', metric.icon, 'text-cyan-600 text-xl']"></i>
            </div>
            <pv-badge :value="metric.title" :severity="getBadgeColor(metric.status)" class="text-sm px-2 py-1"></pv-badge>
          </div>
          <div class="text-5xl font-bold text-gray-800 mb-2">{{ metric.value }}</div>
          <div class="text-base text-gray-500 font-medium">{{ metric.subtitle }}</div>
        </template>
      </pv-card>
    </div>
  </div>
</template>
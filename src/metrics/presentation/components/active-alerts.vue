<script setup lang="js">
import { computed } from "vue";
import { metricsStore } from "../../application/metrics.store.js";

const alerts = computed(() => metricsStore.alerts);
</script>

<template>
  <div class="flex flex-column gap-3 bg-white p-4 border-round shadow-2 h-full">
    <div class="flex align-items-center mb-3 border-bottom-1 border-gray-200 pb-3">
      <i class="pi pi-wave-pulse text-red-500 mr-3 text-2xl"></i>
      <h3 class="m-0 text-gray-800 font-bold text-xl">Mis Alertas Clínicas</h3>
    </div>

    <div v-for="alert in alerts" :key="alert.id"
         :class="['p-4 border-round border-1 mb-2', alert.level === 'danger' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200']">
      <p class="m-0 font-bold text-gray-900 text-lg mb-2">{{ alert.message }}</p>
      <p class="m-0 text-base text-gray-700 line-height-3">{{ alert.description }}</p>
      <p class="m-0 mt-3 text-sm text-gray-500 font-medium"><i class="pi pi-clock mr-1"></i>{{ alert.time }}</p>
    </div>
  </div>
</template>
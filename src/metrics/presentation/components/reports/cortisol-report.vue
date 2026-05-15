<script setup>
import { ref } from 'vue';

// Datos de la semana (Valores del 0 al 100 para la escala del gráfico)
const weeklyData = ref([
  { day: 'Lun', sleep: 70, cortisol: 30 },
  { day: 'Mar', sleep: 60, cortisol: 40 },
  { day: 'Mié', sleep: 40, cortisol: 65 },
  { day: 'Jue', sleep: 80, cortisol: 20 },
  { day: 'Vie', sleep: 30, cortisol: 85 }, // Pico de estrés
  { day: 'Sáb', sleep: 50, cortisol: 55 },
  { day: 'Dom', sleep: 75, cortisol: 25 }
]);
</script>

<template>
  <pv-card class="shadow-2 bg-white">
    <template #title><span class="text-gray-800 font-bold text-xl">Mi Resumen: Sueño vs Estrés (Semanal)</span></template>
    <template #content>
      <div class="flex justify-content-center gap-5 mb-5">
        <div class="flex align-items-center"><div class="w-1rem h-1rem bg-cyan-400 border-round mr-2"></div><span class="font-medium text-gray-700">Descanso (h)</span></div>
        <div class="flex align-items-center"><div class="w-1rem h-1rem bg-red-400 border-round mr-2"></div><span class="font-medium text-gray-700">Cortisol (h)</span></div>
      </div>

      <div class="flex h-20rem mt-2">

        <div class="flex flex-column justify-content-between align-items-end text-gray-500 font-bold text-sm pr-3" style="padding-bottom: 1px;">
          <span>24 h  </span>
          <span>18 h</span>
          <span>12 h</span>
          <span>6 h</span>
          <span>0 h</span>
        </div>

        <div class="flex-grow-1 flex justify-content-around align-items-end border-bottom-2 border-left-2 border-gray-400 relative">

          <div class="absolute w-full border-top-1 border-gray-200 border-dashed" style="bottom: 25%; left: 0;"></div>
          <div class="absolute w-full border-top-1 border-gray-200 border-dashed" style="bottom: 50%; left: 0;"></div>
          <div class="absolute w-full border-top-1 border-gray-200 border-dashed" style="bottom: 75%; left: 0;"></div>
          <div class="absolute w-full border-top-1 border-gray-200 border-dashed" style="bottom: 100%; left: 0;"></div>

          <div v-for="item in weeklyData" :key="item.day" class="flex flex-column align-items-center z-1 w-full h-full relative">

            <div class="flex align-items-end justify-content-center gap-2 w-full h-full">
              <div class="bg-cyan-400 border-round-top shadow-1 hover:bg-cyan-300 transition-colors" style="width: 25px; transition: height 0.5s;" :style="{ height: item.sleep + '%' }"></div>
              <div :class="['border-round-top shadow-1 hover:bg-red-300 transition-colors', item.cortisol > 60 ? 'bg-red-400' : 'bg-yellow-400']" style="width: 25px; transition: height 0.5s;" :style="{ height: item.cortisol + '%' }"></div>
            </div>

            <span class="text-gray-700 font-bold absolute" style="bottom: -30px;">{{ item.day }}</span>
          </div>

        </div>
      </div>

      <div class="h-3rem"></div>

    </template>
  </pv-card>
</template>
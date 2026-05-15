<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppLayout from "./shared/presentation/components/app-layout.vue";

const route = useRoute();

/**
 * Indicates whether the current route must use the internal application layout.
 */
const usesAppLayout = computed(() => route.meta.layout === "app");
</script>

<template>
  <app-layout v-if="usesAppLayout">
    <router-view />
  </app-layout>

  <router-view v-else />
</template>

<style scoped>
</style>
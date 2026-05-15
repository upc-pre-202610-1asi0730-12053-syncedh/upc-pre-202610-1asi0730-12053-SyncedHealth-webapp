<script setup>
/**
 * Displays a visual badge for medical staff status.
 */
defineProps({
  status: {
    type: String,
    default: 'active'
  }
});
</script>

<template>
  <span class="status-badge" :class="status">
    {{ status }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 78px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
}

.active {
  background: rgba(69, 221, 229, 0.22);
  color: #0f6b68;
}

.inactive {
  background: rgba(148, 148, 148, 0.2);
  color: #4F555A;
}
</style>
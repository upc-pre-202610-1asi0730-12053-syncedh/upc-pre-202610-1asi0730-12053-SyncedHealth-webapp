<script setup>
/**
 * Displays a visual badge for a medical staff risk level.
 */
defineProps({
  riskLevel: {
    type: String,
    default: 'low'
  }
});
</script>

<template>
  <span class="risk-badge" :class="riskLevel">
    {{ riskLevel }}
  </span>
</template>

<style scoped>
.risk-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 82px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
}

.low {
  background: rgba(47, 163, 107, 0.14);
  color: #1f7a4e;
}

.moderate {
  background: rgba(244, 180, 0, 0.16);
  color: #9a6b00;
}

.high {
  background: rgba(231, 76, 60, 0.14);
  color: #b42318;
}

.critical {
  background: #2c0d0a;
  color: #ffffff;
}
</style>
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  unit: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'pi pi-chart-line',
  },
});
</script>

<template>
  <article class="health-metric-card">
    <div class="metric-icon">
      <i :class="icon"></i>
    </div>

    <div class="metric-content">
      <span class="metric-title">{{ title }}</span>
      <strong class="metric-value">
        {{ value }} <small v-if="unit">{{ unit }}</small>
      </strong>
    </div>
  </article>
</template>

<style scoped>
.health-metric-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-icon i {
  font-size: 1.5rem;
  color: #2563eb;
}

.metric-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-title {
  color: #64748b;
  font-size: 0.9rem;
}

.metric-value {
  color: #0f172a;
  font-size: 1.45rem;
}

.metric-value small {
  font-size: 0.85rem;
  color: #64748b;
}
</style>
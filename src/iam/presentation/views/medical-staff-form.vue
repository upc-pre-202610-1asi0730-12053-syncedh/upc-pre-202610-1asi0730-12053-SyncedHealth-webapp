<script setup>
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const isEditMode = computed(() => Boolean(route.params.id));

const form = reactive({
  firstName: "",
  lastName: "",
  documentNumber: "",
  phone: "",
  email: "",
  workArea: "",
  specialty: "",
  role: "medical_staff",
  status: "active",
  riskLevel: "low",
  fatigueLevel: 0,
  assignedDeviceId: "dev-001"
});

/**
 * Navigates back to the medical staff list.
 *
 * @returns {void}
 */
function goBack() {
  router.push("/admin/staff/list");
}

/**
 * Saves the current medical staff form.
 *
 * This placeholder keeps the screen functional while the store is connected.
 *
 * @returns {void}
 */
function save() {
  router.push("/admin/staff/list");
}
</script>

<template>
  <section class="staff-page">
    <p class="eyebrow">{{ t("staff.section") }}</p>
    <h1>
      {{ isEditMode ? t("staff.editTitle") : t("staff.createTitle") }}
    </h1>
    <p>{{ t("staff.formSubtitle") }}</p>

    <form class="form-card" @submit.prevent="save">
      <div class="form-grid">
        <label>
          {{ t("staff.firstName") }}
          <input v-model="form.firstName" type="text" required />
        </label>

        <label>
          {{ t("staff.lastName") }}
          <input v-model="form.lastName" type="text" required />
        </label>

        <label>
          {{ t("staff.documentNumber") }}
          <input v-model="form.documentNumber" type="text" />
        </label>

        <label>
          {{ t("staff.phone") }}
          <input v-model="form.phone" type="text" />
        </label>

        <label class="full">
          {{ t("staff.email") }}
          <input v-model="form.email" type="email" required />
        </label>

        <label>
          {{ t("staff.area") }}
          <input v-model="form.workArea" type="text" />
        </label>

        <label>
          {{ t("staff.specialty") }}
          <input v-model="form.specialty" type="text" />
        </label>

        <label>
          {{ t("staff.role") }}
          <select v-model="form.role">
            <option value="medical_staff">{{ t("staff.medicalStaff") }}</option>
            <option value="clinical_supervisor">{{ t("staff.clinicalSupervisor") }}</option>
          </select>
        </label>

        <label>
          {{ t("staff.status") }}
          <select v-model="form.status">
            <option value="active">{{ t("staff.active") }}</option>
            <option value="inactive">{{ t("staff.inactive") }}</option>
          </select>
        </label>

        <label>
          {{ t("staff.risk") }}
          <select v-model="form.riskLevel">
            <option value="low">{{ t("staff.low") }}</option>
            <option value="moderate">{{ t("staff.moderate") }}</option>
            <option value="high">{{ t("staff.high") }}</option>
            <option value="critical">{{ t("staff.critical") }}</option>
          </select>
        </label>

        <label>
          {{ t("staff.fatigue") }}
          <input v-model="form.fatigueLevel" type="number" min="0" max="100" />
        </label>

        <label class="full">
          {{ t("staff.device") }}
          <input v-model="form.assignedDeviceId" type="text" />
        </label>
      </div>

      <div class="form-actions">
        <button class="secondary-button" type="button" @click="goBack">
          {{ t("staff.cancel") }}
        </button>

        <button class="primary-button" type="submit">
          {{ t("staff.save") }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.staff-page {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--cs-primary, #45dde5);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 8px;
  color: var(--cs-dark, #0e2433);
  font-size: 34px;
  font-weight: 800;
}

p {
  margin: 0 0 24px;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 16px;
}

.form-card {
  padding: 24px;
  border: 1px solid #d8ecec;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(14, 36, 51, 0.05);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--cs-dark, #0e2433);
  font-size: 14px;
  font-weight: 800;
}

.full {
  grid-column: 1 / -1;
}

input,
select {
  height: 48px;
  padding: 0 14px;
  border: 1px solid #d5e3ea;
  border-radius: 10px;
  background: #ffffff;
  color: var(--cs-dark, #0e2433);
  font-family: inherit;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--cs-primary, #45dde5);
  box-shadow: 0 0 0 3px rgba(69, 221, 229, 0.18);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.primary-button,
.secondary-button {
  min-height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
}

.primary-button {
  background: var(--cs-primary, #45dde5);
  color: var(--cs-dark, #0e2433);
}

.secondary-button {
  background: #edf3f5;
  color: var(--cs-dark, #0e2433);
}

@media (max-width: 900px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
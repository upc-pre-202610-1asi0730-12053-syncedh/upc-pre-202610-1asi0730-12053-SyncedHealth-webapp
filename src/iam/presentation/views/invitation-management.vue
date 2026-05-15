<script setup lang="js">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

/**
 * Invitation management view connected to json-server.
 * It loads, creates, cancels and deletes invitations using the mock API.
 */
const { t } = useI18n();

const apiUrl = import.meta.env.VITE_CORTISENSE_API_URL || "http://localhost:3000/api/v1";
const invitationsEndpoint = `${apiUrl}/invitations`;

const email = ref("");
const role = ref("medical_staff");
const search = ref("");
const statusFilter = ref("");
const errorMessage = ref("");

const invitations = ref([]);

/**
 * Loads invitations from the mock API.
 *
 * @returns {Promise<void>}
 */
async function loadInvitations() {
  try {
    const response = await fetch(invitationsEndpoint);

    if (!response.ok) {
      throw new Error("Load invitations failed");
    }

    invitations.value = await response.json();
  } catch (error) {
    console.error(error);
    errorMessage.value = t("invitations.loadError");
    invitations.value = [];
  }
}

/**
 * Gets filtered invitations.
 *
 * @returns {Array} Filtered invitation list.
 */
function getFilteredInvitations() {
  const term = search.value.trim().toLowerCase();

  return invitations.value.filter((invitation) => {
    const matchesSearch =
        !term ||
        invitation.email.toLowerCase().includes(term) ||
        invitation.role.toLowerCase().includes(term);

    const matchesStatus =
        !statusFilter.value || invitation.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
}

/**
 * Counts invitations by status.
 *
 * @param {string} status - Invitation status.
 * @returns {number} Number of invitations.
 */
function countByStatus(status) {
  return invitations.value.filter((invitation) => invitation.status === status).length;
}

/**
 * Creates a new invitation and persists it in the mock API.
 *
 * @returns {Promise<void>}
 */
async function createInvitation() {
  const normalizedEmail = email.value.trim().toLowerCase();

  if (!normalizedEmail) {
    errorMessage.value = t("invitations.invalidInvitationData");
    return;
  }

  const alreadyExists = invitations.value.some((invitation) => {
    return invitation.email.toLowerCase() === normalizedEmail &&
        invitation.status === "pending";
  });

  if (alreadyExists) {
    errorMessage.value = t("invitations.invitationAlreadyExists");
    return;
  }

  const newInvitation = {
    id: `inv-${Date.now()}`,
    email: normalizedEmail,
    role: role.value,
    status: "pending",
    createdAt: new Date().toISOString().slice(0, 10)
  };

  try {
    const response = await fetch(invitationsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newInvitation)
    });

    if (!response.ok) {
      throw new Error("Create invitation failed");
    }

    const createdInvitation = await response.json();

    invitations.value.unshift(createdInvitation);

    email.value = "";
    role.value = "medical_staff";
    errorMessage.value = "";
  } catch (error) {
    console.error(error);
    errorMessage.value = t("invitations.createError");
  }
}

/**
 * Cancels a pending invitation.
 *
 * @param {string} id - Invitation identifier.
 * @returns {Promise<void>}
 */
async function cancelInvitation(id) {
  try {
    const response = await fetch(`${invitationsEndpoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "cancelled"
      })
    });

    if (!response.ok) {
      throw new Error("Cancel invitation failed");
    }

    const updatedInvitation = await response.json();

    invitations.value = invitations.value.map((invitation) => {
      return invitation.id === id ? updatedInvitation : invitation;
    });
  } catch (error) {
    console.error(error);
    errorMessage.value = t("invitations.cancelError");
  }
}

/**
 * Deletes an invitation.
 *
 * @param {string} id - Invitation identifier.
 * @returns {Promise<void>}
 */
async function deleteInvitation(id) {
  try {
    const response = await fetch(`${invitationsEndpoint}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Delete invitation failed");
    }

    invitations.value = invitations.value.filter((invitation) => invitation.id !== id);
  } catch (error) {
    console.error(error);
    errorMessage.value = t("invitations.deleteError");
  }
}

/**
 * Gets translated role label.
 *
 * @param {string} value - Role value.
 * @returns {string} Role label.
 */
function getRoleLabel(value) {
  if (value === "clinical_supervisor") return t("invitations.clinicalSupervisor");
  return t("invitations.medicalStaff");
}

/**
 * Gets translated status label.
 *
 * @param {string} value - Status value.
 * @returns {string} Status label.
 */
function getStatusLabel(value) {
  if (value === "pending") return t("invitations.pending");
  if (value === "accepted") return t("invitations.accepted");
  if (value === "cancelled") return t("invitations.cancelled");
  return value;
}

onMounted(loadInvitations);
</script>

<template>
  <section class="invitation-page">
    <div class="page-header">
      <div>
        <h1>Gestión de invitaciones</h1>
        <p>Crea y administra invitaciones para nuevos usuarios de CortiSense.</p>
      </div>
    </div>

    <section class="summary-grid">
      <article class="summary-card">
        <span>Total de invitaciones</span>
        <strong>{{ invitations.length }}</strong>
      </article>

      <article class="summary-card">
        <span>Pendientes</span>
        <strong>{{ countByStatus("pending") }}</strong>
      </article>

      <article class="summary-card">
        <span>Aceptadas</span>
        <strong>{{ countByStatus("accepted") }}</strong>
      </article>

      <article class="summary-card">
        <span>Canceladas</span>
        <strong>{{ countByStatus("cancelled") }}</strong>
      </article>
    </section>

    <section class="content-grid">
      <form class="form-card" @submit.prevent="createInvitation">
        <h2>Nueva invitación</h2>
        <p>El usuario podrá completar su registro con el correo invitado.</p>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <label>
          Correo electrónico
          <input
              v-model="email"
              type="email"
              placeholder="usuario@cortisense.com"
              required
          />
        </label>

        <label>
          Rol
          <select v-model="role">
            <option value="medical_staff">Personal médico</option>
            <option value="clinical_supervisor">Supervisor clínico</option>
          </select>
        </label>

        <button class="primary-button full" type="submit">
          Enviar invitación
        </button>
      </form>

      <section class="table-section">
        <div class="filters-row">
          <input
              v-model="search"
              placeholder="Buscar por correo o rol"
          />

          <select v-model="statusFilter">
            <option value="">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="accepted">Aceptadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
            <tr>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
            </thead>

            <tbody>
            <tr v-if="getFilteredInvitations().length === 0">
              <td colspan="5" class="empty-state">
                No se encontraron invitaciones.
              </td>
            </tr>

            <tr
                v-for="invitation in getFilteredInvitations()"
                :key="invitation.id"
            >
              <td>{{ invitation.email }}</td>
              <td>{{ getRoleLabel(invitation.role) }}</td>
              <td>
                  <span class="badge" :class="invitation.status">
                    {{ getStatusLabel(invitation.status) }}
                  </span>
              </td>
              <td>{{ invitation.createdAt }}</td>
              <td>
                <button
                    v-if="invitation.status === 'pending'"
                    class="link-button"
                    type="button"
                    @click="cancelInvitation(invitation.id)"
                >
                  Cancelar
                </button>

                <button
                    class="link-button danger"
                    type="button"
                    @click="deleteInvitation(invitation.id)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  </section>
</template>

<style scoped>
.invitation-page {
  width: 100%;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0 0 8px;
  color: var(--cs-dark, #0e2433);
  font-size: 36px;
  font-weight: 800;
}

.page-header p {
  margin: 0;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 16px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 32px;
}

.summary-card {
  padding: 24px;
  border: 1px solid #d8ecec;
  border-radius: 18px;
  background: #ffffff;
}

.summary-card span {
  display: block;
  margin-bottom: 12px;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 14px;
  font-weight: 700;
}

.summary-card strong {
  color: var(--cs-dark, #0e2433);
  font-size: 34px;
  font-weight: 800;
}

.content-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;
  align-items: start;
}

.form-card,
.table-section {
  border: 1px solid #d8ecec;
  border-radius: 20px;
  background: #ffffff;
}

.form-card {
  padding: 24px;
}

.form-card h2 {
  margin: 0 0 8px;
  color: var(--cs-dark, #0e2433);
  font-size: 22px;
  font-weight: 800;
}

.form-card p {
  margin: 0 0 22px;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 14px;
  line-height: 1.6;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
  color: var(--cs-dark, #0e2433);
  font-size: 14px;
  font-weight: 800;
}

input,
select {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid #d5e3ea;
  border-radius: 10px;
  background: #ffffff;
  color: var(--cs-dark, #0e2433);
  font-family: inherit;
  font-size: 14px;
}

.primary-button {
  min-height: 48px;
  padding: 0 24px;
  border: none;
  border-radius: 12px;
  background: var(--cs-primary, #45dde5);
  color: var(--cs-dark, #0e2433);
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
}

.primary-button.full {
  width: 100%;
}

.table-section {
  padding: 24px;
}

.filters-row {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 14px;
  margin-bottom: 24px;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  border-bottom: 1px solid #e8f0f3;
}

th {
  padding: 18px 14px;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 13px;
  font-weight: 800;
  text-align: left;
}

td {
  padding: 16px 14px;
  border-bottom: 1px solid #eef4f6;
  color: var(--cs-dark, #0e2433);
  font-size: 14px;
}

.badge {
  display: inline-flex;
  min-width: 88px;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.badge.pending {
  background: #fff8d6;
  color: #9a7b00;
}

.badge.accepted {
  background: rgba(69, 221, 229, 0.18);
  color: #087b79;
}

.badge.cancelled {
  background: #eeeeee;
  color: #4f555a;
}

.link-button {
  border: none;
  background: transparent;
  color: #087b79;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  margin-right: 8px;
}

.link-button.danger {
  color: #d33333;
}

.error-message {
  margin-bottom: 18px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #ffeaea;
  color: #b42318;
  font-size: 13px;
  font-weight: 700;
}

.empty-state {
  padding: 42px 14px;
  color: var(--cs-gray-dark, #4f555a);
  text-align: center;
}
</style>
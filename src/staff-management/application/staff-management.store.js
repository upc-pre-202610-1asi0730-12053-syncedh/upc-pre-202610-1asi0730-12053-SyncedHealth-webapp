import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { StaffManagementApi } from '../infrastructure/staff-management-api.js';
import { MedicalStaffAssembler } from '../infrastructure/medical-staff.assembler.js';

const staffManagementApi = new StaffManagementApi();

/**
 * Staff Management store.
 *
 * Coordinates medical staff use cases and keeps UI-facing state.
 */
const useStaffManagementStore = defineStore('staff-management', () => {
    const staffMembers = ref([]);
    const selectedStaffMember = ref(null);
    const errors = ref([]);
    const loaded = ref(false);

    const searchTerm = ref('');
    const statusFilter = ref('all');
    const riskFilter = ref('all');

    /**
     * Filters staff members by search term, status and risk level.
     */
    const filteredStaffMembers = computed(() => {
        const term = searchTerm.value.trim().toLowerCase();

        return staffMembers.value.filter(member => {
            const matchesSearch = !term
                || member.fullName.toLowerCase().includes(term)
                || member.email.toLowerCase().includes(term)
                || member.specialty.toLowerCase().includes(term)
                || member.workArea.toLowerCase().includes(term);

            const matchesStatus = statusFilter.value === 'all'
                || member.status === statusFilter.value;

            const matchesRisk = riskFilter.value === 'all'
                || member.riskLevel === riskFilter.value;

            return matchesSearch && matchesStatus && matchesRisk;
        });
    });

    /**
     * Loads all medical staff members from the API.
     *
     * @returns {Promise<void>}
     */
    async function fetchStaffMembers() {
        errors.value = [];

        try {
            const response = await staffManagementApi.getMedicalStaff();
            staffMembers.value = MedicalStaffAssembler.toEntitiesFromResponse(response);
            loaded.value = true;
        } catch (error) {
            errors.value.push(error);
        }
    }

    /**
     * Loads one medical staff member by id.
     *
     * @param {string|number} id - Medical staff identifier.
     * @returns {Promise<void>}
     */
    async function fetchStaffMemberById(id) {
        errors.value = [];

        try {
            const response = await staffManagementApi.getMedicalStaffById(id);
            selectedStaffMember.value = MedicalStaffAssembler.toEntityFromResource(response.data);
        } catch (error) {
            errors.value.push(error);
            selectedStaffMember.value = null;
        }
    }

    /**
     * Creates a medical staff member.
     *
     * @param {Object} resource - Medical staff resource.
     * @returns {Promise<Object|null>} Created resource or null.
     */
    async function createStaffMember(resource) {
        errors.value = [];

        try {
            const response = await staffManagementApi.createMedicalStaff(resource);
            const entity = MedicalStaffAssembler.toEntityFromResource(response.data);
            staffMembers.value.push(entity);
            return response.data;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    /**
     * Updates a medical staff member.
     *
     * @param {string|number} id - Medical staff identifier.
     * @param {Object} resource - Medical staff resource.
     * @returns {Promise<Object|null>} Updated resource or null.
     */
    async function updateStaffMember(id, resource) {
        errors.value = [];

        try {
            const response = await staffManagementApi.updateMedicalStaff(id, resource);
            const updatedEntity = MedicalStaffAssembler.toEntityFromResource(response.data);
            const index = staffMembers.value.findIndex(member => member.id === id);

            if (index !== -1) {
                staffMembers.value[index] = updatedEntity;
            }

            selectedStaffMember.value = updatedEntity;
            return response.data;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    /**
     * Deletes a medical staff member.
     *
     * @param {string|number} id - Medical staff identifier.
     * @returns {Promise<boolean>} True when deleted.
     */
    async function deleteStaffMember(id) {
        errors.value = [];

        try {
            await staffManagementApi.deleteMedicalStaff(id);
            staffMembers.value = staffMembers.value.filter(member => member.id !== id);
            return true;
        } catch (error) {
            errors.value.push(error);
            return false;
        }
    }

    /**
     * Updates the search term used by the list.
     *
     * @param {string} value - Search value.
     * @returns {void}
     */
    function setSearchTerm(value) {
        searchTerm.value = value;
    }

    /**
     * Updates the status filter.
     *
     * @param {string} value - Status filter.
     * @returns {void}
     */
    function setStatusFilter(value) {
        statusFilter.value = value;
    }

    /**
     * Updates the risk filter.
     *
     * @param {string} value - Risk filter.
     * @returns {void}
     */
    function setRiskFilter(value) {
        riskFilter.value = value;
    }

    return {
        staffMembers,
        selectedStaffMember,
        errors,
        loaded,
        searchTerm,
        statusFilter,
        riskFilter,
        filteredStaffMembers,
        fetchStaffMembers,
        fetchStaffMemberById,
        createStaffMember,
        updateStaffMember,
        deleteStaffMember,
        setSearchTerm,
        setStatusFilter,
        setRiskFilter
    };
});

export default useStaffManagementStore;
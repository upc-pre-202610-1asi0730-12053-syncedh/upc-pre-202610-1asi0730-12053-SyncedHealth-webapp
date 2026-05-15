/**
 * MedicalStaff entity within the Staff Management bounded context.
 *
 * Represents a professional profile monitored by CortiSense.
 * The entity keeps its attributes private and exposes read-only getters.
 *
 * @class MedicalStaff
 */
export class MedicalStaff {
    #id;
    #userId;
    #firstName;
    #lastName;
    #documentNumber;
    #email;
    #phone;
    #workArea;
    #specialty;
    #staffRole;
    #status;
    #riskLevel;
    #fatigueScore;
    #assignedDeviceId;
    #createdAt;

    /**
     * Creates a MedicalStaff entity.
     *
     * @param {Object} params - Medical staff attributes.
     * @param {string|null} [params.id=null] - Medical staff identifier.
     * @param {string|null} [params.userId=null] - Related IAM user identifier.
     * @param {string} [params.firstName=''] - First name.
     * @param {string} [params.lastName=''] - Last name.
     * @param {string} [params.documentNumber=''] - Personal document number.
     * @param {string} [params.email=''] - Institutional email.
     * @param {string} [params.phone=''] - Phone number.
     * @param {string} [params.workArea=''] - Work area or department.
     * @param {string} [params.specialty=''] - Medical specialty.
     * @param {string} [params.staffRole='medical_staff'] - Staff role.
     * @param {string} [params.status='active'] - Staff status.
     * @param {string} [params.riskLevel='low'] - Current risk level.
     * @param {number} [params.fatigueScore=0] - Current fatigue score.
     * @param {string|null} [params.assignedDeviceId=null] - Assigned device identifier.
     * @param {string} [params.createdAt=''] - Creation date.
     */
    constructor({
                    id = null,
                    userId = null,
                    firstName = '',
                    lastName = '',
                    documentNumber = '',
                    email = '',
                    phone = '',
                    workArea = '',
                    specialty = '',
                    staffRole = 'medical_staff',
                    status = 'active',
                    riskLevel = 'low',
                    fatigueScore = 0,
                    assignedDeviceId = null,
                    createdAt = ''
                }) {
        this.#id = id;
        this.#userId = userId;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#documentNumber = documentNumber;
        this.#email = email;
        this.#phone = phone;
        this.#workArea = workArea;
        this.#specialty = specialty;
        this.#staffRole = staffRole;
        this.#status = status;
        this.#riskLevel = riskLevel;
        this.#fatigueScore = Number(fatigueScore ?? 0);
        this.#assignedDeviceId = assignedDeviceId;
        this.#createdAt = createdAt;
    }

    get id() { return this.#id; }
    get userId() { return this.#userId; }
    get firstName() { return this.#firstName; }
    get lastName() { return this.#lastName; }
    get documentNumber() { return this.#documentNumber; }
    get email() { return this.#email; }
    get phone() { return this.#phone; }
    get workArea() { return this.#workArea; }
    get specialty() { return this.#specialty; }
    get staffRole() { return this.#staffRole; }
    get status() { return this.#status; }
    get riskLevel() { return this.#riskLevel; }
    get fatigueScore() { return this.#fatigueScore; }
    get assignedDeviceId() { return this.#assignedDeviceId; }
    get createdAt() { return this.#createdAt; }

    /**
     * Returns the full display name of the professional.
     *
     * @returns {string} Full name.
     */
    get fullName() {
        return `${this.#firstName} ${this.#lastName}`.trim();
    }

    /**
     * Returns whether the staff member is currently active.
     *
     * @returns {boolean} True when active.
     */
    get isActive() {
        return this.#status === 'active';
    }

    /**
     * Converts the entity into a plain resource object for API persistence.
     *
     * @returns {Object} Medical staff resource.
     */
    toResource() {
        return {
            id: this.#id,
            userId: this.#userId,
            firstName: this.#firstName,
            lastName: this.#lastName,
            documentNumber: this.#documentNumber,
            email: this.#email,
            phone: this.#phone,
            workArea: this.#workArea,
            specialty: this.#specialty,
            staffRole: this.#staffRole,
            status: this.#status,
            riskLevel: this.#riskLevel,
            fatigueScore: this.#fatigueScore,
            assignedDeviceId: this.#assignedDeviceId,
            createdAt: this.#createdAt
        };
    }
}

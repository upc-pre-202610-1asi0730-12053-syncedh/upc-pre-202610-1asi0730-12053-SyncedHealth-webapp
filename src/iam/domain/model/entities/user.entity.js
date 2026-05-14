export class User {
    /**
     * @param {Object} params
     */
    constructor({ id = null, firstName = '', lastName = '', email = '', role = 'doctor', specialty = '', token = '' }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.specialty = specialty;
        this.token = token;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get isAdmin() { return this.role === 'admin'; }
    get isDoctor() { return this.role === 'doctor'; }
}
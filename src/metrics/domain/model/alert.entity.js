export class Alert {
    constructor({ id = "", message = "", description = "", level = "warning", time = "" }) {
        this.id = id;
        this.message = message;
        this.description = description;
        this.level = level;
        this.time = time;
    }
}
export class Metric {
    constructor({ id = "", title = "", value = 0, subtitle = "", status = "neutral", icon = "pi-info-circle" }) {
        this.id = id;
        this.title = title;
        this.value = value;
        this.subtitle = subtitle;
        this.status = status;
        this.icon = icon;
    }
}



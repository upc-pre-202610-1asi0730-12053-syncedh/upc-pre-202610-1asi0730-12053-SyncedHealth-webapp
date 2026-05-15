import { Metric } from "../domain/model/metric.entity.js";
import { Alert } from "../domain/model/alert.entity.js";

export class MockMetricsApi {
    getMetrics() {
        return Promise.resolve([
            new Metric({ id: "1", title: "Mi Estado", value: "Riesgo", subtitle: "Fatiga detectada", status: "warning", icon: "pi-user" }),
            new Metric({ id: "2", title: "Cortisol", value: "22", subtitle: "µg/dL (Elevado)", status: "danger", icon: "pi-exclamation-triangle" }),
            new Metric({ id: "3", title: "Mi HRV", value: "50", subtitle: "ms (En descenso)", status: "warning", icon: "pi-heart-fill" }),
            new Metric({ id: "4", title: "Descanso", value: "4.5h", subtitle: "Promedio semanal", status: "warning", icon: "pi-moon" }),
            new Metric({ id: "5", title: "Wearables", value: "2", subtitle: "Sensores conectados", status: "success", icon: "pi-wifi" })
        ]);
    }

    getAlerts() {
        return Promise.resolve([
            new Alert({ id: "1", message: "Pico de Cortisol Detectado", description: "Tu nivel de estrés actual superó el umbral seguro (22 µg/dL). Te sugerimos un relevo pronto.", level: "danger", time: "Hace 5 min" }),
            new Alert({ id: "2", message: "Fatiga Acumulada", description: "Tu turno actual ha superado las 14 horas continuas en la unidad de emergencias.", level: "warning", time: "Hace 15 min" })
        ]);
    }
}
import { reactive } from "vue";
import { MockMetricsApi } from "../infrastructure/mock-metrics.api.js";

const api = new MockMetricsApi();

export const metricsStore = reactive({
    metrics: [],
    alerts: [],
    isLoading: false,

    async loadDashboardData() {
        this.isLoading = true;
        try {
            this.metrics = await api.getMetrics();
            this.alerts = await api.getAlerts();
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            this.isLoading = false;
        }
    }
});
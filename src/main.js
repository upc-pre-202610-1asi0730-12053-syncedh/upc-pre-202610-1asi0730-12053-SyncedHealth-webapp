import { createApp } from "vue";
import "./style.css";
import App from "./app.vue";
import PrimeVue from 'primevue/config';

import router from "./router.js";
import pinia from "./pinia.js";
import i18n from "./i18n.js";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Badge from 'primevue/badge';
import Card from 'primevue/card';
import Dialog from "primevue/dialog";
import Button from 'primevue/button';

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(pinia);
app.use(i18n);

app.component('pv-data-table', DataTable);
app.component('pv-column', Column);
app.component('pv-badge', Badge);
app.component('pv-card', Card);
app.component('pv-dialog', Dialog);
app.component('pv-button', Button);

app.mount("#app");
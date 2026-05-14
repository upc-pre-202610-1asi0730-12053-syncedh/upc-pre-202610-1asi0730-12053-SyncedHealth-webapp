import { createApp } from 'vue';
import './style.css';
import App from './app.vue';
import i18n from './i18n.js';
import router from './router.js';
import pinia from './pinia.js';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import Material from '@primeuix/themes/material';
import PrimeVue from 'primevue/config';

import {
    Button,
    Card,
    Checkbox,
    Column,
    ConfirmationService,
    ConfirmDialog,
    DataTable,
    Dialog,
    DialogService,
    Drawer,
    FloatLabel,
    IconField,
    InputIcon,
    InputText,
    Select,
    SelectButton,
    Tag,
    Textarea,
    Toast,
    ToastService,
    Toolbar,
    Tooltip,
} from 'primevue';

createApp(App)
    .use(i18n)
    .use(pinia)
    .use(router)
    .use(PrimeVue, { theme: { preset: Material }, ripple: true })
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .component('pv-button',       Button)
    .component('pv-card',         Card)
    .component('pv-column',       Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox',     Checkbox)
    .component('pv-data-table',   DataTable)
    .component('pv-dialog',       Dialog)
    .component('pv-select',       Select)
    .component('pv-select-button', SelectButton)
    .component('pv-float-label',  FloatLabel)
    .component('pv-icon-field',   IconField)
    .component('pv-input-icon',   InputIcon)
    .component('pv-input-text',   InputText)
    .component('pv-drawer',       Drawer)
    .component('pv-tag',          Tag)
    .component('pv-textarea',     Textarea)
    .component('pv-toolbar',      Toolbar)
    .component('pv-toast',        Toast)
    .directive('tooltip', Tooltip)
    .mount('#app');

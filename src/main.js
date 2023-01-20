/**
 * Premier's Awards: Admin Application
 * Developer: Spencer Rose (BCGov, PSA)
 * Version: 2.0.0
 * Module: main.js
 *
 * **/

// Vue imports
import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {createPinia} from "pinia/dist/pinia";

// import Primevue components
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import Toast from 'primevue/toast';
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Card from 'primevue/card';
import Sidebar from 'primevue/sidebar';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import ScrollPanel from "primevue/scrollpanel";
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import SplitButton from "primevue/splitbutton";
import Dialog from "primevue/dialog";
import ConfirmDialog from "primevue/confirmdialog";
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';
import ProgressBar from 'primevue/progressbar';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage';
import Skeleton from 'primevue/skeleton';
import Avatar from 'primevue/avatar';
import Divider from "primevue/divider";
import Editor from "primevue/editor";
import Checkbox from "primevue/checkbox";
import ToggleButton from "primevue/togglebutton";
import Toolbar from "primevue/toolbar";
import FileUpload from "primevue/fileupload";

// import custom components
import Header from '@/components/common/Header.vue';
import Placeholder from '@/components/common/Placeholder.vue';
import EditorToolbar from '@/components/common/EditorToolbar.vue';
import PartnersFieldset from '@/components/fieldsets/PartnersFieldset.vue';
import PartnerFieldset from '@/components/fieldsets/PartnerFieldset.vue';
import NomineeFieldset from '@/components/fieldsets/NomineeFieldset.vue';
import NomineesFieldset from '@/components/fieldsets/NomineesFieldset.vue';
import OrganizationsFieldset from '@/components/fieldsets/OrganizationsFieldset.vue';
import NominatorFieldset from '@/components/fieldsets/NominatorFieldset.vue';
import NominatorsFieldset from '@/components/fieldsets/NominatorsFieldset.vue';
import NominationTitleFieldset from '@/components/fieldsets/NominationTitleFieldset.vue';
import EvaluationsFieldset from '@/components/fieldsets/EvaluationsFieldset.vue';
import ContactsFieldset from '@/components/fieldsets/ContactsFieldset.vue';
import ContactFieldset from '@/components/fieldsets/ContactFieldset.vue';
import LocationsFieldset from '@/components/fieldsets/LocationsFieldset.vue';
import LocationFieldset from '@/components/fieldsets/LocationFieldset.vue';
import AttachmentFieldset from '@/components/fieldsets/AttachmentFieldset.vue';
import AttachmentsFieldset from '@/components/fieldsets/AttachmentsFieldset.vue';
import AcknowledgmentFieldset from '@/components/fieldsets/AcknowledgmentFieldset.vue';

// initialize app
const app = createApp(App);

// register global components
app.component('Menubar', Menubar);
app.component('Toast', Toast);
app.component('Message', Message);
app.component('InlineMessage', InlineMessage);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Card', Card);
app.component('Sidebar', Sidebar);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Button', Button);
app.component('SplitButton', SplitButton);
app.component('Tag', Tag);
app.component('Dialog', Dialog);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ProgressSpinner', ProgressSpinner);
app.component('ProgressBar', ProgressBar);
app.component('Skeleton', Skeleton);
app.component('Avatar', Avatar);
app.component('Divider', Divider);
app.component('Menu', Menu);
app.component('ScrollPanel', ScrollPanel);
app.component('Toolbar', Toolbar);

// register form components
app.component('Fieldset', Fieldset);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('InputMask', InputMask);
app.component('MultiSelect', MultiSelect);
app.component('Dropdown', Dropdown);
app.component('Checkbox', Checkbox);
app.component('FileUpload', FileUpload);
app.component('Editor', Editor);
app.component('ToggleButton', ToggleButton);

// register custom components
app.component('Header', Header);
app.component('Placeholder', Placeholder);
app.component('EditorToolbar', EditorToolbar);
app.component('PartnersFieldset', PartnersFieldset);
app.component('PartnerFieldset', PartnerFieldset);
app.component('NomineeFieldset', NomineeFieldset);
app.component('NomineesFieldset', NomineesFieldset);
app.component('OrganizationsFieldset', OrganizationsFieldset);
app.component('NominatorFieldset', NominatorFieldset);
app.component('NominatorsFieldset', NominatorsFieldset);
app.component('NominationTitleFieldset', NominationTitleFieldset);
app.component('EvaluationsFieldset', EvaluationsFieldset);
app.component('ContactsFieldset', ContactsFieldset);
app.component('ContactFieldset', ContactFieldset);
app.component('LocationsFieldset', LocationsFieldset);
app.component('LocationFieldset', LocationFieldset);
app.component('AttachmentsFieldset', AttachmentsFieldset);
app.component('AttachmentFieldset', AttachmentFieldset);
app.component('AcknowledgmentFieldset', AcknowledgmentFieldset);

// initialize and mount app
app.use(ConfirmationService);
app.use(ToastService);
app.use(PrimeVue);
app.directive('tooltip', Tooltip);
app.use(createPinia());
app.use(router);
app.mount('#app');
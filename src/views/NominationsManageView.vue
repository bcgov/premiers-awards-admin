<template>
  <div>
    <Header header="Manage Nominations" />
    <Placeholder v-if="loading" />
    <div v-else>
      <ConfirmDialog group="nominations">
        <template #message="slotProps">
          <div class="card p-4">
            <div class="flex mb-5">
              <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
              <span class="pl-2">Confirm {{ slotProps.message.header }}</span></div>
            <div class="pl-2 w-80">
              <div class="grid">
                <div class="col-3"><b>Nominee/Title:</b></div>
                <div v-if="slotProps.message.message.title" class="col-9">
                  {{slotProps.message.message.title}}
                </div>
                <div v-else-if="slotProps.message.message.nominee" class="col-9">
                  {{slotProps.message.message.nominee.firstname}}
                  {{slotProps.message.message.nominee.lastname}}
                </div>
                <div class="col-3"><b>Category:</b></div>
                <div class="col-9">{{lookup('categories', slotProps.message.message.category)}}</div>
                <div class="col-3"><b>Organization:</b></div>
                <div class="col-9">{{lookup('organizations', slotProps.message.message.organization)}}</div>
              </div>
            </div>
          </div>
        </template>
      </ConfirmDialog>

      <ConfirmDialog group="downloads">
        <template #message="slotProps">
          <div class="card p-4">
            <div class="flex mb-5">
              <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
              <span class="pl-2">Confirm {{ slotProps.message.header }}</span>
            </div>
            <div class="pl-2 w-80">
              <div v-for="nomination in selectedNominations">
                <div class="grid">
                  <div v-if="nomination.seq" class="col-2">
                    {{nomination.seq}}
                  </div>
                  <div class="col-10">
                    {{lookup('categories', nomination.category)}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ConfirmDialog>

      <Dialog
          header="View Nomination"
          v-model:visible="dialog.visible"
          :breakpoints="{'960px': '80vw', '640px': '90vw'}"
          :style="{width: '70vw'}">
        <template #footer>
          <Button label="Close" icon="pi pi-times" @click="reset" />
        </template>
        <NominationView />
      </Dialog>

      <DataTable
          :value="items"
          :paginator="false"
          class="p-datatable-nominations"
          dataKey="_id"
          :rowHover="true"
          v-model:filters="filters"
          v-model:selection="selectedNominations"
          filterDisplay="menu"
          :loading="loading"
          responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between">
            <h2 class="m-0">Nominations</h2>
            <span v-if="downloading">
              <ProgressSpinner
                  style="width:50px;height:50px"
                  strokeWidth="8"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                  aria-label="Downloading"
              />
              Downloading...</span>
            <span class="p-buttonset">
              <Button label="Refresh" icon="pi pi-sync" @click="reload" />
              <Button
                  :disabled="!Array.isArray(selectedNominations) || selectedNominations.length === 0"
                  label="Download"
                  icon="pi pi-download"
                  @click="downloadBulk"
              />
              <Button label="Nominate" icon="pi pi-bookmark" @click="add" />
            </span>
          </div>
        </template>
        <template #empty>
          No nominations found.
        </template>
        <template #loading>
          Loading user data...
        </template>
        <Column selectionMode="multiple"></Column>
        <Column
            field="seq"
            header="Seq"
        >
        </Column>
        <Column
            field="submitted"
            header="Status"
            :sortable="true"
        >
          <template #body="{data}">
            <Tag v-if="data.submitted" severity="success" icon="pi pi-lock" rounded>Submitted</Tag>
            <Tag v-else severity="warning" icon="pi pi-unlock" rounded>Draft</Tag>
          </template>
        </Column>
        <Column
            field="category"
            header="Category"
            :sortable="true"
            :showFilterMatchModes="false"
            :filterMenuStyle="{'width':'14rem'}"
            style="min-width:12rem"
        >
          <template #body="{data}">
            {{ lookup('categories', data.category) }}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect
                v-model="filterModel.value"
                :options="cats"
                optionLabel="label"
                optionValue="key"
                placeholder="Any"
                class="p-column-filter"
                :showToggleAll="false"
                @change=filterCallback()
            />
          </template>
        </Column>
        <Column
            field="organization"
            header="Organization"
            :sortable="true"
            :showFilterMatchModes="false"
            :filterMenuStyle="{'width':'14rem'}"
            style="min-width:12rem"
        >
          <template #body="{data}">
            {{ lookup('organizations', data.organization) }}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect
                v-model="filterModel.value"
                :options="orgs"
                optionLabel="label"
                optionValue="key"
                placeholder="Any"
                class="p-column-filter"
                :showToggleAll="false"
                @change=filterCallback()
            />
          </template>
        </Column>
        <Column field="owner" header="Owner" :sortable="true">
          <template #body="{data}">
            {{data.owner && data.owner.hasOwnProperty('username') ? data.owner.username : '-'}}
          </template>
        </Column>
        <Column field="createdAt" header="Created" :sortable="true">
          <template #body="{data}">
            {{new Date(data.createdAt).toLocaleString()}}
          </template>
        </Column>
        <Column field="updatedAt" header="Updated" :sortable="true">
          <template #body="{data}">
            {{new Date(data.updatedAt).toLocaleString()}}
          </template>
        </Column>
        <Column style="width: 14rem" bodyStyle="text-align: center; overflow: visible;">
          <template #body="{data}">
            <div class="p-buttonset">
              <Button
                  v-if="isAdmin"
                  v-tooltip.top="'Unsubmit Nomination'"
                  :disabled="!data.submitted"
                  icon="pi pi-unlock"
                  @click="unsubmit(data)"
              />
              <Button
                  v-tooltip.top="'View Nomination'"
                  icon="pi pi-eye"
                  @click="view(data)"
              />
              <Button
                  :disabled="!data.submitted"
                  v-tooltip.top="'Download Nomination'"
                  icon="pi pi-download"
                  @click="download(data)"
              />
              <Button
                  :disabled="data.submitted"
                  v-tooltip.top="'Edit Nomination'"
                  icon="pi pi-pencil"
                  @click="edit(data)"
              />
              <Button
                  :disabled="data.submitted"
                  v-tooltip.top="'Delete Nomination'"
                  icon="pi pi-trash"
                  @click="remove(data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import { useConfirm } from "primevue/useconfirm";
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { authDataStore } from "@/stores/auth.store";
import {nominationsDataStore} from "@/stores/nominations.store";
import {useVuelidate} from "@vuelidate/core";
import settings from "@/services/settings.services";
import {FilterMatchMode} from "primevue/api";
import messages from "@/services/message.services";
import {useToast} from "primevue/usetoast";
import NominationView from "@/views/NominationView.vue";

// get current user
const { current, isAdmin } = storeToRefs(authDataStore());

// validator
const v$ = useVuelidate();

// initialize messages
const toast = useToast();

// initialize selected nominations
const selectedNominations = ref();

// get local options
const orgs = settings.get('organizations') || [];
const cats = settings.get('categories') || [];
const statuses = settings.get('status') || [];
const lookup = settings.lookup;

// initialize references
const { selected, items, loading, downloading, error } = storeToRefs(nominationsDataStore());
const store = nominationsDataStore();
const confirm = useConfirm();
const indexRouter = useRouter();
const dialog = reactive({
  header: '',
  visible: false,
  callback: ()=>{}
});

// update dialog data
const setDialog = (setting) => {
  dialog.header = setting.header;
  dialog.visible = setting.visible;
  dialog.callback = setting.callback;
};

// reset dialog data
const resetDialog = () => {
  dialog.header = '';
  dialog.visible = false;
  dialog.callback = ()=>{};
};

// reset selected data
const reset = () => {
  store.reset();
  resetDialog();
};

// define data loader
const reload = async () => {
  isAdmin.value ? await store.getAll() : await store.getByGUID(current.value.guid);
  await reset();
};

// load data on component mount
// - nominators load nominations associated with their GUID
// - administrators load all nominations
onMounted(reload);

// apply custom data filters
const filters = ref({
  'category': {value: null, matchMode: FilterMatchMode.IN},
  'organization': {value: null, matchMode: FilterMatchMode.IN},
});

// subscribe to user store actions
store.$onAction(
    ({name, store, _, after}) => {
      after(() => {
        // post message
        const {text=''} = messages.get(name) || {};
        if (store.getErrors) toast.add({
          severity: 'error', summary: 'An Error has Occurred', detail: store.getErrors.text, life: 3000});
        else if (text) {
          toast.add({severity: 'success', summary: 'Update Successful!', detail: text, life: 3000})
        }
      })
    }
);

// view requested nomination
const view = (data) => {
  selected.value = Object.assign({}, data);
  setDialog({
    header: 'View Nomination',
    visible: true,
    callback: reset
  });
};

// redirect to nominate page
const add = () => {
  reset();
  indexRouter.push({name: 'nominator-dashboard'});
};

// edit item dialog
const edit = (data) => {
  const { _id=null, category='' } = data || {};
  navigate('edit-nomination', {category: category, id: _id})
};

// unsubmit item dialog
const unsubmit = async (data) => {
  selected.value = data;
  confirm.require({
    group: 'nominations',
    message: data,
    header: 'Unsubmit Nomination',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-warn',
    accept: async () => {
      await store.unsubmit();
      await reload();
    },
    reject: reset,
    onHide: reset
  });
};

// delete confirmation dialog
const remove = (data) => {
  selected.value = data;
  confirm.require({
    group: 'nominations',
    message: data,
    header: 'Confirm Deletion',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      await store.remove();
      await reload();
    },
    reject: reset,
    onHide: reset
  });
};

// download single package
const download = async (data) => {
  const { _id=null } = data || {};
  await store.download([{_id: _id}], 'zip');
};

// download nomination packages
const downloadBulk = async () => {
  confirm.require({
    group: 'downloads',
    header: 'Download Nomination Packages',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-warn',
    accept: async () => {
      await store.download(selectedNominations.value, 'zip');
    }
  });
};

// test if form is invalid
const invalid = () => {
  v$.value.$touch();
  return v$.value.$invalid;
}

// navigate to page
const navigate = (name, params) => {
  indexRouter.push({ name: name, params: params })
};

</script>
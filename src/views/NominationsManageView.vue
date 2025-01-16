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
              <span class="pl-2">Confirm {{ slotProps.message.header }}</span>
            </div>
            <div class="pl-2 w-80">
              <div class="grid">
                <div class="col-3"><b>Nominee/Title:</b></div>
                <div v-if="slotProps.message.message.title" class="col-9">
                  {{ slotProps.message.message.title }}
                </div>
                <div
                  v-else-if="slotProps.message.message.nominee"
                  class="col-9"
                >
                  {{ slotProps.message.message.nominee.firstname }}
                  {{ slotProps.message.message.nominee.lastname }}
                </div>
                <div class="col-3"><b>Category:</b></div>
                <div class="col-9">
                  {{
                    settings.lookup(
                      "categories",
                      slotProps.message.message.category
                    )
                  }}
                </div>
                <div class="col-3"><b>Organizations:</b></div>
                <div class="col-9">
                  <div v-for="org in slotProps.message.message.organizations">
                    {{ settings.lookup("organizations", org) || "" }}
                  </div>
                </div>
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
              <div
                v-for="nomination in selectedNominations.filter(
                  (n) => n.submitted
                )"
              >
                <div class="grid">
                  <div v-if="nomination.seq" class="col-2">
                    {{ nomination.seq }}
                  </div>
                  <div class="col-10">
                    {{ settings.lookup("categories", nomination.category) }}
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
        :breakpoints="{ '960px': '80vw', '640px': '90vw' }"
        :style="{ width: '70vw' }"
      >
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
        ref="dt"
        :rowHover="true"
        v-model:filters="filters"
        v-model:selection="selectedNominations"
        filterDisplay="menu"
        :loading="loading"
        responsiveLayout="stack"
      >
        <template #header>
          <div class="flex justify-content-between">
            <h2 class="m-0">Nominations</h2>
            <span v-if="downloading">
              <ProgressSpinner
                style="width: 50px; height: 50px"
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
                aria-label="Downloading"
              />
              Downloading...</span
            >
            <div>
              <span class="p-buttonset">
                <Button label="Refresh" icon="pi pi-sync" @click="reload" />
                <Button
                  :disabled="
                    !Array.isArray(selectedNominations) ||
                    selectedNominations.length === 0
                  "
                  label="Download"
                  icon="pi pi-download"
                  @click="downloadBulk"
                />
                <Button
                  label="Export"
                  icon="pi pi-sign-out"
                  @click="exportCSV($event)"
                />
                <!-- PA-149 Disable nominations button if nominations are closed. -->
                <Button
                  :label="nominationsOpen ? 'Nominate' : 'Nominations have closed'"
                  :icon="{'pi':true, 'pi-bookmark': nominationsOpen, 'pi-exclamation-circle': !nominationsOpen}" 
                  @click="add" 
                  :disabled="!nominationsOpen" 
                />
              </span>
              <span class="p-input-icon-left ml-2">
                <i class="pi pi-search" />
                <InputText
                  aria-label="Keyword Search"
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                />
              </span>
            </div>
          </div>
        </template>
        <template #empty> No nominations found. </template>
        <template #loading> Loading user data... </template>
        <Column selectionMode="multiple"></Column>
        <Column field="seq" header="Seq"> </Column>
        <Column field="number" header="Number" style="display: none">
          <template #body="{ data }">
            {{ data.number }}
          </template>
        </Column>
        <Column
          field="submitted"
          header="Status"
          :sortable="true"
          :showFilterMatchModes="false"
          :filterMenuStyle="{ width: '14rem' }"
        >
          <template #body="{ data }">
            <Tag
              v-if="data.submitted"
              severity="success"
              icon="pi pi-lock"
              rounded
              >Submitted</Tag
            >
            <Tag v-else severity="warning" icon="pi pi-unlock" rounded
              >Draft</Tag
            >
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <MultiSelect
              aria-label="Filter Nomination Status"
              v-model="filterModel.value"
              :options="statuses"
              optionLabel="label"
              optionValue="value"
              placeholder="Any"
              class="p-column-filter"
              :showToggleAll="false"
              @change="filterCallback()"
            />
          </template>
        </Column>
        <Column
          field="category"
          header="Category"
          :sortable="true"
          :showFilterMatchModes="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            {{ settings.lookup("categories", data.category) }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <MultiSelect
              aria-label="Filter Nomination Categories"
              v-model="filterModel.value"
              :options="cats"
              optionLabel="label"
              optionValue="key"
              placeholder="Any"
              class="p-column-filter"
              :showToggleAll="false"
              @change="filterCallback()"
            />
          </template>
        </Column>
        <Column field="title" header="Title/Nominee" :sortable="true">
          <template #body="{ data }">
            {{
              data.title
                ? data.title
                : data.nominee &&
                  data.nominee.hasOwnProperty("firstname") &&
                  data.nominee.hasOwnProperty("lastname")
                ? `${data.nominee.firstname} ${data.nominee.lastname}`
                : "-"
            }}
          </template>
        </Column>
        <Column
          field="organizations"
          header="Organizations"
          :sortable="true"
          :showFilterMatchModes="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <div v-for="org in data.organizations">
              {{ settings.lookup("organizations", org) || "" }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <MultiSelect
              aria-label="Filter Organization"
              v-model="filterModel.value"
              :options="orgs"
              optionLabel="label"
              optionValue="key"
              placeholder="Any"
              class="p-column-filter"
              :showToggleAll="false"
              @change="filterCallback()"
            />
          </template>
        </Column>
        <Column field="ministry" header="Ministry" style="display: none">
          <template #body="{ data }">
            {{ data.ministry }}
          </template>
        </Column>
        <Column
          field="primaryNominator"
          header="Nominator"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.primaryNominator }}
          </template>
        </Column>
        <Column
          field="primaryNominatorTitle"
          header="Nominator's Title"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.primaryNominatorTitle }}
          </template>
        </Column>
        <Column
          field="primaryNominatorEmail"
          header="Nominator's Email"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.primaryNominatorEmail }}
          </template>
        </Column>
        <Column field="coNominator" header="Co-nominator" style="display: none">
          <template #body="{ data }">
            {{ data.coNominator }}
          </template>
        </Column>
        <Column
          field="coNominatorEmail"
          header="Co-nominator's Email"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.coNominatorEmail }}
          </template>
        </Column>
        <Column
          field="coNominatorTitle"
          header="Co-nominator's Title"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.coNominatorTitle }}
          </template>
        </Column>
        <Column
          field="nominationContact"
          header="Nomination contact"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.nominationContact }}
          </template>
        </Column>
        <Column
          field="nominationContactEmail"
          header="Contact's Email"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.nominationContactEmail }}
          </template>
        </Column>
        <Column
          field="nominationContactPhone"
          header="Contact's Phone"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.nominationContactPhone }}
          </template>
        </Column>
        <Column
          field="videoContact"
          header="Video contact"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.videoContact }}
          </template>
        </Column>
        <Column
          field="videoContactEmail"
          header="Video contact email"
          style="display: none"
        >
          <template #body="{ data }">
            {{ data.videoContactEmail }}
          </template>
        </Column>

        <Column field="owner.username" header="Owner" :sortable="true">
          <template #body="{ data }">
            {{
              data.owner && data.owner.hasOwnProperty("username")
                ? data.owner.username
                : "-"
            }}
          </template>
        </Column>
        <Column field="createdAt" header="Created" :sortable="true">
          <template #body="{ data }">
            {{ new Date(data.createdAt).toLocaleString() }}
          </template>
        </Column>
        <Column field="updatedAt" header="Updated" :sortable="true">
          <template #body="{ data }">
            {{ new Date(data.updatedAt).toLocaleString() }}
          </template>
        </Column>
        <Column
          style="width: 14rem"
          bodyStyle="text-align: center; overflow: visible;"
        >
          <template #body="{ data }">
            <div class="p-buttonset">
              <Button
                aria-label="Unsubmit Nomination"
                v-if="isAdmin"
                v-tooltip.top="'Unsubmit Nomination'"
                :disabled="!data.submitted"
                icon="pi pi-unlock"
                @click="unsubmit(data)"
              />
              <Button
                aria-label="View Nomination"
                v-tooltip.top="'View Nomination'"
                icon="pi pi-eye"
                @click="view(data)"
              />
              <Button
                aria-label="Download Nomination Package"
                :disabled="!data.submitted"
                v-tooltip.top="'Download Nomination'"
                icon="pi pi-download"
                @click="download(data)"
              />
              <Button
                aria-label="Edit Nomination"
                :disabled="data.submitted || !nominationsOpen"
                v-tooltip.top="'Edit Nomination'"
                icon="pi pi-pencil"
                @click="edit(data)"
              />
              <Button
                aria-label="Delete Nomination"
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
import { onMounted, reactive, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { authDataStore } from "@/stores/auth.store";
import { nominationsDataStore } from "@/stores/nominations.store";
import { settingsStore } from "@/stores/settings.store";
import { useVuelidate } from "@vuelidate/core";
import { FilterMatchMode, FilterService } from "primevue/api";
import messages from "@/services/message.services";
import { useToast } from "primevue/usetoast";
import NominationView from "@/views/NominationView.vue";

// get current user
const { current, isAdmin } = storeToRefs(authDataStore());
const {
  selected: settingSelected,
  items: settingItems,
  loading: settingLoading,
  error: settingError,
} = storeToRefs(settingsStore());

// validator
const v$ = useVuelidate();

// initialize messages
const toast = useToast();

// initialize selected nominations
const selectedNominations = ref();

// get local options
//const orgs = (await settings.lookup("organizations")) || [];
//const cats = (await settings.lookup("categories")) || [];
//const statuses = (await settings.lookup("status")) || [];
//const lookup = settings.lookup;

// initialize references
const { selected, items, loading, downloading, error } = storeToRefs(
  nominationsDataStore()
);

const dt = ref();
const store = nominationsDataStore();
const settings = settingsStore();

const confirm = useConfirm();
const indexRouter = useRouter();
const dialog = reactive({
  header: "",
  visible: false,
  callback: () => {},
});

// PA-149 Gets the nominations open boolean from server. Defaults to true
const nominationsOpen = ref(true);
( async () => {

  const open = await store.isOpen;
  nominationsOpen.value = open;
})();

// update dialog data
const setDialog = (setting) => {
  dialog.header = setting.header;
  dialog.visible = setting.visible;
  dialog.callback = setting.callback;
};

// reset dialog data
const resetDialog = () => {
  dialog.header = "";
  dialog.visible = false;
  dialog.callback = () => {};
};

// reset selected data
const reset = () => {
  store.reset();
  resetDialog();
};

// define data loader
const reload = async () => {
  isAdmin.value
    ? await store.getAll()
    : await store.getByGUID(current.value.guid);

  await reset();
};

// load data on component mount
// - nominators load nominations associated with their GUID
// - administrators load all nominations
onMounted(() => {
  // load data on component mount
  reload();
  // init custom data table filter
  FilterService.register("someInArray", (values, filter) => {
    return (
      filter === undefined ||
      filter === null ||
      filter.length === 0 ||
      values === undefined ||
      values === null ||
      filter.some((r) => values.includes(r))
    );
  });
});

// apply custom data filter match
// define roles filter key
const orgsFilter = ref("someInArray");
const matchModeOptions = ref([{ label: "In Array", value: orgsFilter.value }]);

// apply custom data filters
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  submitted: { value: null, matchMode: FilterMatchMode.IN },
  category: { value: null, matchMode: FilterMatchMode.IN },
  organizations: { value: null, matchMode: orgsFilter.value },
});

// subscribe to user store actions
store.$onAction(({ name, store, _, after }) => {
  after(() => {
    // post message
    const { text = "" } = messages.get(name) || {};
    if (store.getErrors)
      toast.add({
        severity: "error",
        summary: "An Error has Occurred",
        detail: store.getErrors.text,
        life: 3000,
      });
    else if (text) {
      toast.add({
        severity: "success",
        summary: "Update Successful!",
        detail: text,
        life: 3000,
      });
    }
  });
});

// view requested nomination
const view = (data) => {
  selected.value = Object.assign({}, data);
  setDialog({
    header: "View Nomination",
    visible: true,
    callback: reset,
  });
};

// redirect to nominate page
const add = () => {

  // PA-149 Disable nominations if nominations are closed

  if ( !nominationsOpen.value ) return console.log("Nominations have closed");
  reset();
  indexRouter.push({ name: "nominator-dashboard" });
};

// edit item dialog
const edit = (data) => {
  const { _id = null, category = "" } = data || {};
  navigate("edit-nomination", { category: category, id: _id });
};

// unsubmit item dialog
const unsubmit = async (data) => {
  selected.value = data;
  confirm.require({
    group: "nominations",
    message: data,
    header: "Unsubmit Nomination",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-warn",
    accept: async () => {
      await store.unsubmit();
      await reload();
    },
    reject: reset,
    onHide: reset,
  });
};

// delete confirmation dialog
const remove = (data) => {
  selected.value = data;
  confirm.require({
    group: "nominations",
    message: data,
    header: "Confirm Deletion",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: async () => {
      await store.remove();
      await reload();
    },
    reject: reset,
    onHide: reset,
  });
};

// download single package
const download = async (data) => {
  const { _id = null } = data || {};
  await store.download([{ _id: _id }], "zip");
};

// download nomination packages
const downloadBulk = async () => {
  const filteredNominations = selectedNominations.value.filter(
    (n) => n.submitted
  );
  confirm.require({
    group: "downloads",
    header: "Download Nomination Packages",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-warn",
    accept: async () => {
      await store.download(filteredNominations, "zip");
    },
  });
};

// export nominations
const exportCSV = async () => {
  dt.value.exportCSV();
};

// test if form is invalid
const invalid = () => {
  v$.value.$touch();
  return v$.value.$invalid;
};

// navigate to page
const navigate = (name, params) => {
  indexRouter.push({ name: name, params: params });
};
</script>

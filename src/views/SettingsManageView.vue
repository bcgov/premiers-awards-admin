<template>
  <div>
    <Header header="Manage Settings" />
    <Placeholder v-if="loading" />
    <div v-else>
      <ConfirmDialog>
        <template #message="slotProps">
          <div class="card p-4">
            <div class="flex mb-5">
              <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
              <span class="pl-2">Delete Setting</span>
            </div>
            <div class="pl-2 w-80">
              <div class="grid">
                <div class="col-6"><b>Type:</b></div>
                <div class="col-6">{{ slotProps.message.message.type }}</div>
                <div class="col-6"><b>Label:</b></div>
                <div class="col-6">{{ slotProps.message.message.label }}</div>
                <div class="col-6"><b>Value:</b></div>
                <div class="col-6">{{ slotProps.message.message.value }}</div>
              </div>
            </div>
          </div>
        </template>
      </ConfirmDialog>

      <Dialog
        header="Edit Setting"
        v-model:visible="dialog.visible"
        :breakpoints="{ '960px': '80vw', '640px': '90vw' }"
        :style="{ width: '70vw' }"
      >
        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            @click="reset"
            class="p-button-text"
          />
          <Button
            :disabled="invalid()"
            label="Submit"
            icon="pi pi-check"
            @click="dialog.callback"
            autofocus
          />
        </template>
        <SettingFieldset mode="edit" />
      </Dialog>

      <DataTable
        :value="items"
        :paginator="false"
        class="p-datatable-settings"
        dataKey="id"
        :rowHover="true"
        :loading="loading"
        responsiveLayout="stack"
      >
        <template #header>
          <div class="flex justify-content-between">
            <h2 class="m-0">Settings</h2>
            <span class="p-buttonset">
              <Button label="Refresh" icon="pi pi-sync" @click="reload" />
              <Button
                :disabled="!isSuperAdmin"
                label="Add Setting"
                icon="pi pi-plus"
                @click="add"
              />
            </span>
          </div>
        </template>
        <template #empty> No settings found. </template>
        <template #loading> Loading settings... </template>
        <Column field="type" header="Type" :sortable="true">
          <template #body="{ data }">
            {{ data.type }}
          </template>
        </Column>
        <Column field="label" header="Label" :sortable="true">
          <template #body="{ data }">
            {{ data.label }}
          </template>
        </Column>
        <Column field="value" header="Value" :sortable="true">
          <template #body="{ data }">
            {{ data.value }}
          </template>
        </Column>
        <Column bodyStyle="text-align: center; overflow: visible">
          <template #body="{ data }">
            <div class="p-buttonset" style="text-align: right">
              <Button
                aria-label="Edit Setting"
                icon="pi pi-pencil"
                @click="edit(data)"
              />
              <Button
                aria-label="Delete Setting"
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
import { onMounted, reactive } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { authDataStore } from "@/stores/auth.store";
import { settingsStore } from "@/stores/settings.store";
import { useVuelidate } from "@vuelidate/core";
import messages from "@/services/message.services";
import SettingFieldset from "@/components/fieldsets/SettingFieldset.vue";

// get current user info
const { isSuperAdmin } = storeToRefs(authDataStore());

// validator
const v$ = useVuelidate();

// initialize messages
const toast = useToast();

// initialize references
const { selected, items, loading, error } = storeToRefs(settingsStore());
const store = settingsStore();
const confirm = useConfirm();
const indexRouter = useRouter();
const dialog = reactive({
  header: "",
  visible: false,
  callback: () => {},
});

// load data
onMounted(store.getAll);

// subscribe to settings store actions
store.$onAction(({ name, store, _, after }) => {
  after(() => {
    // post message
    const { text = "" } = messages.get(name) || {};
    if (store.getErrors)
      toast.add({
        severity: "error",
        summary: "An Error has Occurred",
        detail: store.getErrors.text,
        life: 5000,
      });
    else if (text) {
      toast.add({
        severity: "success",
        summary: "Update Successful!",
        detail: text,
        life: 5000,
      });
    }
  });
});

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

// open new item dialog
const add = () => {
  reset();
  setDialog({
    header: "New Setting",
    visible: true,
    callback: create,
  });
};

// create new item
const create = async () => {
  await store.insert();
  await reload();
};

// edit item dialog
const edit = (data) => {
  selected.value = Object.assign({}, data);
  selected.value.value = JSON.stringify(selected.value.value);
  setDialog({
    header: "Edit Record",
    visible: true,
    callback: update,
  });
};

// update item data
const update = async () => {
  // check if form is valid
  const valid = await v$.value.$validate();
  if (!valid) return;
  selected.value.value = JSON.parse(selected.value.value);

  // update collection + reload data
  await store.update();
  await reload();
};

// delete confirmation dialog
const remove = (data) => {
  selected.value = data;
  confirm.require({
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

// cancel item update
const reset = () => {
  store.reset();
  resetDialog();
};

// cancel item update
const reload = async () => {
  await store.getAll();
  reset();
};

// test if form is invalid
const invalid = () => {
  v$.value.$touch();
  return v$.value.$invalid;
};
</script>

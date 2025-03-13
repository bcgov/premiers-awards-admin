<template>
  <Fieldset legend="Nominations dates">
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12 md:col-6">
          Open date:
          <Calendar
            v-model="nominationDates.open"
            showIcon
            :showOnFocus="false"
            dateFormat="yy-mm-dd"
            showTime
          />
        </div>

        <div class="field col-12 md:col-6">
          Closing date:
          <Calendar
            v-model="nominationDates.close"
            showIcon
            :showOnFocus="false"
            dateFormat="yy-mm-dd"
            showTime
          />
        </div>
      </div>
      <div>
        <Button label="Update" @click="updateNominationDates" />
      </div>
    </div>
  </Fieldset>
  <Fieldset legend="Clear all nomination data">
    <ConfirmDialog group="deleteAllNominationsConfirm" />
    <div class="card flex justify-content-left">
      <Button
        @click="deleteAllNominations()"
        label="Delete all nominations"
      ></Button>
    </div>
  </Fieldset>
</template>

<script setup>
import { ref } from "vue";

import { storeToRefs } from "pinia/dist/pinia";
import { settingsStore } from "@/stores/settings.store";
import { get, post } from "@/services/api.services";

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

// load settings state
const { selected, error, items } = storeToRefs(settingsStore());

const store = settingsStore();
const confirm = useConfirm();
const toast = useToast();

/*
  PA-149/160 Allow for the nominations close date to be changed by PA team
  Get the full setting object (type, label, value, etc) from items, and then find the nominationsclose key.
  This is needed so that the setting can be updated again. Simply using the store.lookup does not return enough data.
*/
const globalSettings = items.value.find((x) => x.type === "globalSettings");

const formatDateForLocalTimezone = (date) => {
  if (date == null) return "";

  return new Date(date);
};

const nominationDates = ref({
  close: formatDateForLocalTimezone(globalSettings.value["nominationsclose"]),
  open: formatDateForLocalTimezone(globalSettings.value["nominationsopen"]),
});

// PA-201 Add all nomination deletion
const deleteAllNominations = () => {
  confirm.require({
    group: "deleteAllNominationsConfirm",
    message:
      "Please confirm you would like to delete all nomination data. This will permanently delete all nominations!",
    icon: "pi pi-exclamation-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    acceptLabel: "Delete all nominations",
    rejectLabel: "Cancel",
    rejectClass: "p-button-outlined p-button-sm",
    acceptClass: "p-button-sm",
    accept: async () => {
      const [error, result] = await get(`admin/settings/deleteallnominations`);
      if (!error && result) {
        toast.add({
          severity: "info",
          summary: "All nominations deleted",
          detail: "You have deleted all nominations",
          life: 5000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Server Error",
          detail: "Nominations have not been deleted.",
          life: 5000,
        });
      }
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Cancelled",
        detail: "Nominations have not been deleted.",
        life: 5000,
      });
    },
  });
};
const updateNominationDates = async () => {
  globalSettings.value["nominationsclose"] = nominationDates.value["close"];
  globalSettings.value["nominationsopen"] = nominationDates.value["open"];
  selected.value = globalSettings;
  await store.update();
  await reload();
};

const reload = async () => {
  await store.getAll();
  reset();
};
</script>

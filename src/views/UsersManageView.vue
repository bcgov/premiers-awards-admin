<template>
  <div>
    <Header header="Manage Users" />
    <Placeholder v-if="loading" />
    <div v-else>
      <ConfirmDialog group="remove">
        <template #message="slotProps">
          <div class="card p-4">
            <div class="flex mb-5">
              <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
              <span class="pl-2">Delete User</span>
            </div>
            <div class="pl-2 w-80">
              <div class="grid">
                <div class="col-6"><b>GUID:</b></div>
                <div class="col-6">{{ slotProps.message.message.guid }}</div>
                <div class="col-6"><b>Username (IDIR):</b></div>
                <div class="col-6">
                  {{ slotProps.message.message.username }}
                </div>
                <div class="col-6"><b>First Name:</b></div>
                <div class="col-6">
                  {{ slotProps.message.message.firstname }}
                </div>
                <div class="col-6"><b>Last Name:</b></div>
                <div class="col-6">
                  {{ slotProps.message.message.lastname }}
                </div>
                <div class="col-6"><b>Roles:</b></div>
                <div class="col-6">
                  <div v-for="role in slotProps.message.message.roles">
                    {{ settings.lookup("roles", role) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ConfirmDialog>
      <ConfirmDialog group="bulkRemove">
        <!-- Dialog for the bulk remove option (PA-148) -->
        <template #message="slotProps">
          <div class="card p-4">
            <div class="flex mb-5">
              <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
              <span class="pl-2">Delete Selected Users</span>
            </div>
            <div class="pl-2 w-80" v-for="entry in slotProps.message.message">
              <div class="grid">
                <div class="col-6"><b>GUID:</b></div>
                <div class="col-6">{{ entry.guid }}</div>
                <div class="col-6"><b>Username (IDIR):</b></div>
                <div class="col-6">
                  {{ entry.username }}
                </div>
                <div class="col-6"><b>First Name:</b></div>
                <div class="col-6">
                  {{ entry.firstname }}
                </div>
                <div class="col-6"><b>Last Name:</b></div>
                <div class="col-6">
                  {{ entry.lastname }}
                </div>
                <div class="col-6"><b>Roles:</b></div>
                <div class="col-6">
                  <div v-for="role in entry.roles">
                    {{ settings.lookup("roles", role) }}
                  </div>
                </div>
              </div>
              <br /><br />
            </div>
          </div>
        </template>
      </ConfirmDialog>
      <ConfirmDialog group="resetUsers">
        <template #message="slotProps">
          <div class="card p-4">
            <div class="flex mb-5">
              <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
              <span class="pl-2"
                >Please confirm you would like to reset users. This will delete
                all non-administrative users (i.e. all Nominators and
                Registrars)</span
              >
            </div>
            <div class="flex mb-5">
              <span class="pl-2"
                ><sub
                  >This should be performed after nomination period ends, and
                  the start of a new premiers awards cycle.</sub
                ></span
              >
            </div>
          </div>
        </template>
      </ConfirmDialog>
      <Dialog
        header="Edit User"
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
        <UserFieldset mode="edit" />
      </Dialog>
      <Toast />
      <ConfirmPopup group="templating">
        <template #message="slotProps">
          <div
            class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border p-3 mb-3 pb-0"
          >
            <i
              :class="slotProps.message.icon"
              class="text-6xl text-primary-500"
            ></i>
            <p>{{ slotProps.message.message }}</p>
          </div>
        </template>
      </ConfirmPopup>

      <DataTable
        :value="items"
        :paginator="false"
        class="p-datatable-users"
        dataKey="_id"
        :rowHover="true"
        v-model:filters="filters"
        :globalFilterFields="['role.value']"
        v-model:selection="selectedUsers"
        filterDisplay="menu"
        :loading="loading"
        responsiveLayout="stack"
      >
        <template #header>
          <div class="flex justify-content-between">
            <h2 class="m-0">Users</h2>
            <span class="p-buttonset">
              <Button
                label="Reset Users"
                icon="pi pi-user-minus"
                @click="resetUsers($event)"
              />
              <Button label="Refresh" icon="pi pi-sync" @click="reload" />
              <Button
                :disabled="!isSuperAdmin"
                label="Add User"
                icon="pi pi-user-plus"
                @click="add"
              />
              <!-- New button for the bulk remove option (PA-148) -->
              <Button
                v-show="showBulkRemove()"
                label="Delete Users"
                icon="pi pi-user-minus"
                @click="bulkRemove"
              />
            </span>
          </div>
        </template>
        <template #empty> No users found. </template>
        <template #loading> Loading user data... </template>
        <Column selectionMode="multiple"></Column>
        <Column field="username" header="Username" :sortable="true">
          <template #body="{ data }">
            {{ data.username }}
          </template>
        </Column>
        <Column field="firstname" header="First Name" :sortable="true">
          <template #body="{ data }">
            {{ data.firstname }}
          </template>
        </Column>
        <Column field="lastname" header="Last Name" :sortable="true">
          <template #body="{ data }">
            {{ data.lastname }}
          </template>
        </Column>
        <Column
          field="roles"
          header="Roles"
          :sortable="true"
          :showFilterMatchModes="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <div v-for="role in data.roles">
              {{ settings.lookup("roles", role) || "" }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <MultiSelect
              v-model="filterModel.value"
              :options="roles"
              optionLabel="label"
              optionValue="key"
              placeholder="Any"
              class="p-column-filter"
              :showToggleAll="false"
              @change="filterCallback()"
            />
          </template>
        </Column>
        <Column bodyStyle="text-align: center; overflow: visible">
          <template #body="{ data }">
            <div class="p-buttonset" style="text-align: right">
              <Button
                aria-label="Edit User"
                icon="pi pi-user-edit"
                @click="edit(data)"
              />
              <Button
                aria-label="Delete User"
                :disabled="
                  data.guid !== 'super-administrator' &&
                  data.guid === current.guid
                "
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
import { usersDataStore } from "@/stores/users.store";
import { useVuelidate } from "@vuelidate/core";
import { settingsStore } from "@/stores/settings.store";
import { FilterService } from "primevue/api";
import UserFieldset from "@/components/fieldsets/UserFieldset.vue";
import messages from "@/services/message.services";
import { useToast } from "primevue/usetoast";

// get current user info
const { current, isSuperAdmin } = storeToRefs(authDataStore());

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

// define roles filter key
const rolesFilter = ref("someInArray");

onMounted(() => {
  // load data on component mount
  settings.getAll();
  store.getAll();
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

// apply custom data filters
const filters = ref({
  roles: { value: null, matchMode: rolesFilter.value },
});
const matchModeOptions = ref([{ label: "In Array", value: rolesFilter.value }]);

// get options for user roles
//const roles = settings.lookup("roles") || [];
//const lookup = settings.lookup;

// initialize references
const { selected, items, loading, error } = storeToRefs(usersDataStore());
const store = usersDataStore();
const settings = settingsStore();
const confirm = useConfirm();
const indexRouter = useRouter();
const dialog = reactive({
  header: "",
  visible: false,
  callback: () => {},
});

// initialize selected users, forms part of bulk delete users (PA-148)
const selectedUsers = ref();

// Bulk delete option for selected users (PA-148)
const showBulkRemove = () => {
  return (
    isSuperAdmin &&
    Array.isArray(selectedUsers.value) &&
    selectedUsers.value.length > 0
  );
};

const bulkRemove = () => {
  confirm.require({
    group: "bulkRemove",
    message: selectedUsers.value,
    header: "Delete selected users",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: async () => {
      // Create an array of Promises for each of the selected user's remove API call
      Promise.all(
        selectedUsers.value.map(async (x) => {
          return await store.removeGuid(x.guid);
        })
      );

      selectedUsers.value = [];
      await reload();
    },
  });
};

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
  indexRouter.push({ name: "users-create" });
};

// create new item
const create = async () => {
  await store.insert();
  await reload();
};

// edit item dialog
const edit = (data) => {
  selected.value = Object.assign({}, data);
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

  // update collection + reload data
  await store.update();
  await reload();
};

// delete confirmation dialog
const remove = (data) => {
  selected.value = data;
  confirm.require({
    message: data,
    group: "remove",
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

const resetUsers = (data) => {
  selected.value = data;
  confirm.require({
    message: data,
    group: "resetUsers",
    header: "Confirm User Reset",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: async () => {
      await store.resetUsers();
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
  await settings.getAll();
  await store.getAll();
  reset();
};

// test if form is invalid
const invalid = () => {
  v$.value.$touch();
  return v$.value.$invalid;
};
</script>

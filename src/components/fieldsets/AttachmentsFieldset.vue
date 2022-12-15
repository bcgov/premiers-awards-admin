<template>

  <Dialog
      :header="dialog.header"
      v-model:visible="dialog.visible"
      :breakpoints="{'960px': '80vw', '640px': '90vw'}"
      :style="{width: '70vw'}"
      baseZIndex="9999"
  >
    <AttachmentFieldset :data="selectedAttachment" :cancel="reset" />
  </Dialog>

  <ConfirmDialog group="attachments">
    <template #message="slotProps">
      <div class="card p-4">
        <div class="flex mb-5">
          <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
          <span class="pl-2">Delete Attachment</span></div>
        <div class="pl-2 w-80">
          <div class="grid">
            <div class="col-6"><b>Label:</b></div>
            <div class="col-6">{{slotProps.message.message.label}}</div>
            <div class="col-6"><b>Description:</b></div>
            <div class="col-6">{{slotProps.message.message.description}}</div>
            <div class="col-6"><b>File Name:</b></div>
            <div class="col-6">{{slotProps.message.message.filename}}</div>
          </div>
        </div>
      </div>
    </template>
  </ConfirmDialog>

  <div id="attachments-fieldset">
    <h3>Attachments</h3>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <p>Please submit up to <b>5</b> attachments in support of the nomination.
            The combined total page count of your documents cannot exceed <b>5</b> pages.</p>
        </div>
        <div class="field col-12">
          <DataTable
              :value="selected.attachments"
              :paginator="false"
              :rowHover="false"
              :loading="loading"
          >
            <template #header>
              <div class="grid">
                <div class="col-3">
                  <Button
                    :disabled="selected.attachments.length >= 5 || selected.submitted"
                    label="Attach File"
                    icon="pi pi-plus"
                    @click="add"
                  />
                </div>
                <div class="col-9">
                  <p><strong>Only Adobe PDF (Portable Document Format) documents are accepted.</strong></p>
                </div>
              </div>
            </template>
            <template #empty>
              No saved attachments.
            </template>
            <template #loading>
              Loading attachments...
            </template>
            <Column field="label" header="Label" :sortable="true">
              <template #body="{data}">{{ data.label || '(No Label)' }}</template>
            </Column>
            <Column field="description" header="Description" :sortable="true">
              <template #body="{data}">{{ data.description || '(No Description)' }}</template>
            </Column>
            <Column field="file" header="File" :sortable="true">
              <template #body="{data}">
                <span style="cursor: default" v-tooltip.top="data.file.originalname">
                  {{ data.file
                    ? `${data.file.originalname.slice(0,15)} (${ formatFileSize(data.file.size) })`
                    : '(No File)'
                  }}
                </span>
              </template>
            </Column>
            <Column bodyStyle="text-align: center; overflow: visible;">
              <template #body="{data}">
                <div class="p-buttonset">
                  <Button :loading="downloading" icon="pi pi-download" @click="download(data)" />
                  <Button icon="pi pi-pencil" @click="edit(data)" :disabled="submitted" />
                  <Button icon="pi pi-trash" @click="remove(data)" :disabled="submitted" />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div><!-- End Attachments -->
</template>

<script setup>

import {reactive, ref} from "vue";
import { useConfirm } from "primevue/useconfirm";
import { storeToRefs } from 'pinia';
import {useRoute, useRouter} from 'vue-router'
import {useVuelidate} from "@vuelidate/core";
import {formatFileSize} from "@/services/util.services";
import {nominationsDataStore} from "@/stores/nominations.store";

// validator
const v$ = useVuelidate();

// initialize references
const { selected, items, loading, downloading, error, submitted } = storeToRefs(nominationsDataStore());
const selectedAttachment = ref(null);
const store = nominationsDataStore();
const confirm = useConfirm();
const indexRouter = useRouter();
const route = useRoute();
const dialog = reactive({
  header: '',
  visible: false,
  callback: ()=>{}
});

// update item data
const setDialog = (setting) => {
  dialog.header = setting.header;
  dialog.visible = setting.visible;
  dialog.callback = setting.callback;
};

// update item data
const resetDialog = () => {
  dialog.header = '';
  dialog.visible = false;
  dialog.callback = ()=>{};
  selectedAttachment.value = null;
};

// edit attachment dialog
const edit = (data) => {
  selectedAttachment.value = data;
  setDialog({
    header: 'Edit Attachment',
    visible: true,
    callback: update
  });
};

// open add attachment dialog
const add = async () => {
  selectedAttachment.value = {
    label: '',
    description: '',
    file: null
  };
  setDialog({
    header: 'Add Attachment',
    visible: true,
    callback: update
  });
}

// delete confirmation dialog
const remove = (data) => {
  console.log(data)
  const {_id='', file=null, label='', description=''} = data || {};
  confirm.require({
    group: 'attachments',
    message: {
      label: label || '(No Label)',
      description: description || '(No Description)',
      filename: file && file.hasOwnProperty('originalname') ? file.originalname : '(No file)',
    },
    header: 'Confirm Deletion',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      await store.removeAttachment(_id);
      await reload();
    },
    reject: reset,
    onHide: reset
  });
};

// update attachment metadata
const update = async () => {
  resetDialog();
  await reload();
};


// download attachment file to local drive
const download = async (attachment) => {
  await store.downloadAttachment(attachment);
}

// cancel item update
const reset = () => {
  // store.reset();
  resetDialog();
};

// cancel item update
const reload = async () => {
  const {id=null} = route.params || {};
  await store.getByID(id);
  reset();
};

// test if form is invalid
const invalid = () => {
  v$.value.$touch();
  return v$.value.$invalid;
}

</script>

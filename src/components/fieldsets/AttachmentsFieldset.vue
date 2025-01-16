<template>

  <Dialog
      :header="dialog.header"
      v-model:visible="dialog.visible"
      :breakpoints="{'960px': '80vw', '640px': '90vw'}"
      :style="{width: '70vw'}"
      :baseZIndex="9999"
      :closable="false"
      :closeOnEscape="false"
  >
    <AttachmentFieldset :data="selectedAttachment" :cancel="reload" />
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
          
          <!-- Updated text (PA-159) -->
          <p>
            Please submit up to <b>5</b> attachments in support of the nomination. The combined total page count of your documents cannot exceed <b>5</b> pages. 
          </p>
          <!-- PA-154 Display message explaining whether PDFs are required or recommended. --> 

          <template v-if="isIndividualNomination">

            <p><b>Reminder: All individual nominations require 2 testimonials or letters of support.</b></p>
          </template>
          <template v-else>
            
            <p><b>Reminder: Attachments are strongly recommended.</b></p>
          </template>
          <p>
            <b>IMPORTANT NOTES:</b>
          </p>
          <ul>
            <li>Any pages over 5 are automatically deleted from your nomination and will not be reviewed by the adjudicators and judges</li>
            <li>Attachments cannot include videos or hyperlinks. These will not be reviewed by the adjudicators and judges</li>
            <li>Be sure your attachments do not have access restrictions prior to submitting. Password protected attachments will be automatically deleted from your nomination</li>
            <li>Attachments must be in PDF format</li>
          </ul> 
          
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
                <div class=" md:col-9 col-12">
                  <p><strong>Only Adobe PDF (Portable Document Format) documents are accepted.</strong></p>
                </div>
                <div class="md:col-3 col-12">
                  <Button
                    :disabled="selected.attachments.length >= 5 || selected.submitted"
                    label="Attach File"
                    icon="pi pi-plus"
                    @click="add"
                  />
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
                  {{
                    !data.file ? '(No File)' : `${data.file.originalname.slice(0, 15)} (${formatFileSize(data.file.size)})`
                  }}
                </span>
              </template>
            </Column>
            <Column bodyStyle="text-align: center; overflow: visible;" header="Editor">
              <template #body="{data}">
                <div class="p-buttonset">
                  <Button
                      aria-label="Download Attachment"
                      :loading="downloading"
                      icon="pi pi-download"
                      @click="download(data)"
                  />
                  <Button
                      aria-label="Edit Attachment"
                      icon="pi pi-pencil"
                      @click="edit(data)"
                      :disabled="submitted"
                  />
                  <Button
                      aria-label="Delete Attachment"
                      icon="pi pi-trash"
                      @click="remove(data)"
                      :disabled="submitted"
                  />
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
import {formatFileSize, scrollToAnchor} from "@/services/util.services";
import {nominationsDataStore} from "@/stores/nominations.store";
import { settingsStore } from "@/stores/settings.store";

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

//PA-154 Get nomination type and check whether it's group or individual. For individual nominations, PDFs are required. 

const isIndividualNomination = store.isIndividualNomination; 

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
  await store.update();
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
    reject: reload,
    onHide: reload
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
  scrollToAnchor();
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

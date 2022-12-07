<template>
  <Message v-if="selected.attachments.length >= maxUploads" severity="warn">
    You have reached the maximum number of attachments allowed.
  </Message>
  <Fieldset v-else legend="Nomination Attachment">
    <div class="card">
      <div class="p-fluid grid">
        <div v-if="!data.file" class="field col-12">
          <FileUpload
              :disabled="submitted"
              name="attachedFiles[]"
              :multiple="false"
              :accept="acceptedFileTypes"
              :maxFileSize="maxFileSize"
              :customUpload="true"
              @uploader="upload($event)"
          >
            <template #header>
              <ProgressBar :value="totalSizePercent" :showValue="false" :class="['md:w-20rem h-1rem w-full md:ml-auto', {'exceeded-progress-bar': (totalSizePercent > 100)}]"><span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span></ProgressBar>
            </template>
            <template #empty>
              <p>Drag and drop file here to upload.</p>
            </template>
          </FileUpload>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
            <InputText :disabled="submitted" id="label" type="text" v-model="data.label" />
            <label for="label">Label</label>
          </span>
        </div>
        <div class="field col-12 md:col-6">
            <span class="p-float-label">
              <InputText :disabled="submitted" id="description" type="text" v-model="data.description" />
              <label for="label">Description</label>
            </span>
        </div>
      </div>
    </div>
    <div v-if="uploadedFiles.length > 0">
      <h5>Completed Uploads</h5>
      <DataTable :value="uploadedFiles">
        <Column field="label" header="Label"></Column>
        <Column field="name" header="Filename" />
        <Column field="size" header="File size"></Column>
      </DataTable>
    </div>
  </Fieldset>
  <div class="card">
    <div class="flex align-self-end p-3">
      <Button v-if="data.file" label="Update" icon="pi pi-check" @click="update" />
      <Button label="Close" icon="pi pi-times" @click="cancel" class="p-button-text"/>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {useConfirm} from "primevue/useconfirm";
import {storeToRefs} from 'pinia';
import {useRoute, useRouter} from 'vue-router'
import {nominationsDataStore} from "@/stores/nominations.store";
import {useToast} from "primevue/usetoast";
import {formatFileSize} from "@/services/util.services";

// define props
const props = defineProps(['data', 'cancel']);

// initialize references
const { selected, items, loading, error, submitted } = storeToRefs(nominationsDataStore());
const store = nominationsDataStore();
const confirm = useConfirm();
const indexRouter = useRouter();
const route = useRoute();
const uploadedFiles = ref([]);

// settings
const maxUploads = 5;
const maxFileSize = 1000000;
const acceptedFileTypes = 'application/pdf';

const toast = useToast();
const totalSize = ref(0);
const totalSizePercent = ref(0);

// Upload attachment file and attach to nomination
const upload = async (event) => {
  try {
    const file = event.files[0];
    await store.uploadAttachment(file, props.data.label, props.data.description);
    // add file to completed uploads list
    if (!error.value) uploadedFiles.value.push({
      name: file.name,
      size: formatFileSize(file.size),
      label: props.data.label
    });
  } catch (e) {
    error.value = e;
  }
}

// Update attachment metadata
const update = async () => {
  await store.updateAttachment(props.data);
  await store.getAll();
}

</script>

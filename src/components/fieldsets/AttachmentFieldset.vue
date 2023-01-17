<template>
  <Fieldset legend="Nomination Attachment">
    <div class="card">
      <Message v-if="uploadedFiles.length + selected.attachments.length >= maxUploads" severity="warn">
        You have reached the maximum number of attachments allowed.
      </Message>
      <div v-else class="p-fluid grid">
        <div class="field col-12">
          <p>You can upload up to
            {{maxUploads - (uploadedFiles.length + selected.attachments.length)}} additional attachment(s)</p>
          <p>Ensure you fill out the title and description before uploading.</p>
        </div>
        <div v-if="!data.file" class="field col-12">
          <FileUpload
              :disabled="submitted"
              name="attachedFiles[]"
              :multiple="false"
              :accept="acceptedFileTypes"
              :maxFileSize="maxFileSize"
              :customUpload="true"
              :previewWidth="0"
              @uploader="upload($event)"
          >
<!--            <template #header>-->
<!--              <ProgressBar-->
<!--                  :value="totalSizePercent"-->
<!--                  :showValue="false"-->
<!--                  :class="['md:w-20rem h-1rem w-full md:ml-auto', {'exceeded-progress-bar': (totalSizePercent > 100)}]">-->
<!--                <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>-->
<!--              </ProgressBar>-->
<!--            </template>-->
            <template #empty>
              <p>Drag and drop file here to upload.</p>
            </template>
          </FileUpload>
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
    <div v-else class="p-fluid grid">
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
  </Fieldset>
  <div class="card">
    <div class="flex align-self-end p-3">
      <Button v-if="data.file" label="Update" icon="pi pi-check" @click="update" />
      <Button label="Close" icon="pi pi-times" @click="complete" class="p-button-text"/>
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
import {formatFileSize, scrollToAnchor} from "@/services/util.services";

// define props
const props = defineProps(['data', 'cancel']);

// initialize references
const { selected, items, loading, error, submitted } = storeToRefs(nominationsDataStore());
const nominationsStore = nominationsDataStore();
const confirm = useConfirm();
const indexRouter = useRouter();
const route = useRoute();
const uploadedFiles = ref([]);
const refresh = ref(false);

// settings
const maxUploads = 5;
const maxFileSize = 1000000;
const acceptedFileTypes = 'application/pdf';
const maxAttachments = uploadedFiles.value.length + selected.value.attachments.length >= maxUploads

const toast = useToast();
const totalSize = ref(0);
const totalSizePercent = ref(0);

// load selected nomination
const load = async () => {
  const {id=null} = route.params || {};
  await nominationsStore.getByID(id);
}

// complete operation
const complete = async () => {
  if (refresh.value) await load();
  await props.cancel();
}

// Upload attachment file and attach to nomination
const upload = async (event) => {
  try {
    const file = event.files[0];
    await nominationsStore.uploadAttachment(file, props.data.label, props.data.description);
    // add file to completed uploads list
    if (!error.value) {
      uploadedFiles.value.push({
        name: file.name,
        size: formatFileSize(file.size),
        label: props.data.label
      });
      refresh.value = true;
    }
  } catch (e) {
    error.value = e;
  }
}

// Update attachment metadata
const update = async () => {
  await nominationsStore.updateAttachment(props.data);
  // refresh attachments for nomination
  await nominationsStore.getAttachments();
  scrollToAnchor();
}

</script>

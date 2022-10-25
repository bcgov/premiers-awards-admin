<template>
  <div>
    <b-card bg-variant="light" class="mb-3"><!-- Nomination Attachments -->
      <b-form-group
        id="input-group-attachments"
        label="Nomination File Attachments"
        label-for="input-attachments"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-4"
      >
        <b-card bg-variant="grey" class="mb-2">
          <p>Please submit up to <b>5</b> attachments in support of the nomination.
            The combined total page count of your documents cannot exceed <b>5</b> pages.</p>
          <p>Acceptable file formats include the following</p>
          <ul>
            <li>Adobe PDF (Portable Document Format) documents</li>
          </ul>
          <b-container>
            <b-row
              v-for="(attachment, index) in attachments"
              v-bind:key="index"
              align-h="between"
              class="m-2"
            >
              <b-col cols="3">
                <b>File {{index + 1}}</b>
                <div v-if="isSaved(index)">
                  <b-button
                    block
                    size="sm"
                    class="mr-2"
                    variant="outline-primary"
                    @click="downloadAttachment(attachment)"
                  >
                    Download
                  </b-button>
                  <b-button
                    block
                    size="sm"
                    variant="outline-primary"
                    @click="deleteAttachment(attachment)"
                    :disabled="submitted"
                  >
                    Delete
                  </b-button>
                </div>
              </b-col>
              <b-col v-if="isSaved(index)">
                <b-table
                  size="sm"
                  stacked
                  :items="[attachment]"
                  :fields="[
                  {key: 'label', label: 'Label'},
                  {key: 'description', label: 'Description'},
                  ]"
                  responsive="sm"
                  primary-key="id"
                >
                </b-table>
                <b-table
                  size="sm"
                  stacked
                  :items="[attachment.file]"
                  :fields="[
                  {key: 'originalname', label: 'Filename'},
                  {key: 'mimetype', label: 'Format'},
                  {key: 'size', label: 'Filesize'}
                  ]"
                  responsive="sm"
                  primary-key="id"
                >
                  <template #cell(mimetype)="row">
                    {{lookup('mimeTypes', row.item.mimetype)}} document
                  </template>
                  <template #cell(size)="row">
                    {{Math.floor(row.item.size / 1000)}} kB
                  </template>
                </b-table>
              </b-col>

              <b-col v-if="!isSaved(index)">
                <b-form-group
                  :id="`input-group-attachment-${index}-file`"
                  :label="`Attach File ${index + 1}`"
                  :label-for="`input-attachment-${index}`"
                >
                  <b-form-file
                    :id="`input-attachment-${index}-file`"
                    v-model="attachment.file"
                    :state="Boolean(attachment.file)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    accept=".pdf"
                  ></b-form-file>
                  <b-form-invalid-feedback :state="Boolean(attachment.file)">
                    An attached file is required.
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="Boolean(attachment.file)">
                    File '{{ attachment.file ? attachment.file.name : '' }}' is attached
                    and valid.
                  </b-form-valid-feedback>

                  <b-form-group
                    :id="`input-group-attachment-${index}-label`"
                    label="Label"
                    :label-for="`input-group-attachment-${index}-label`"
                    description="Optional"
                  >
                    <b-form-input
                      :id="`input-group-attachment-${index}-label`"
                      v-model="attachment.label"
                      placeholder="Enter a label for this file"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group
                    :id="`input-group-attachment-${index}-description`"
                    label="Description"
                    :label-for="`input-group-attachment-${index}-description`"
                    description="Optional"
                  >
                    <b-form-input
                      :id="`input-group-attachment-${index}-description`"
                      v-model="attachment.description"
                      placeholder="Enter a short description for this file"
                      :disabled="false"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-button
                    class="m-2"
                    v-if="!attachment.filename && attachments.length > 1"
                    variant="outline-primary"
                    @click="removeAttachment(index)"
                    :disabled="submitted"
                  >
                    Remove Attachment
                  </b-button>

                </b-form-group>
              </b-col>

            </b-row>
          </b-container>
        </b-card>

        <b-button
          v-if="attachments.length < 5"
          block variant="outline-primary"
          @click="addAttachment()"
          :disabled="false"
        >
          Add Attachment
        </b-button>

      </b-form-group>
    </b-card>

    <b-navbar fixed="bottom" align="right">
      <b-alert
        v-if="message.text"
        show="5"
        fade
        dismissible
        :variant="message.type"
        @dismissed="message={text:'', type:''}"
      >
        {{message.text}}
      </b-alert>
    </b-navbar>

  </div>
</template>

<script>

import app from '@/services/api.services'
import { saveAs } from 'file-saver';
import formServices from '@/services/settings.services'

export default {
  name: "attachments-input",
  data () {
    return {
      message: {
        text: '',
        type: ''
      }
    }
  },
  computed: {
    attachments: {
      get () {
        return this.$store.getters.getAttachments;
      },
      set (value) {
        this.$store.dispatch("setAttachments", value)
      }
    },
    nomination () {
      return this.$store.getters.getNomination
    },
    submitted() {
      return this.$store.getters.getNomination.submitted
    },
    isSaved() {
      return function (index) {
        return !!(this.attachments[index].file && this.attachments[index].file.destination)
      }
    }
  },
  methods: {
    lookup(key, value) {
      return formServices.lookup(key, value)
    },
    addAttachment(){
      this.attachments.push({
        file: null,
        label: '',
        description: '',
      })
    },
    removeAttachment(counter){
      if (this.attachments.length > 1)
        this.attachments.splice(counter, 1);
    },
    async deleteAttachment(attachment){
      try {
        const { _id='' } = attachment || {};
        this.message = {
          text: 'Deleting attachment...',
          type: 'info'
        }
        await app.get(`attachments/delete/${_id}`)
        this.message = {
          text: 'Attachment deleted successfully!',
          type: 'success'
        }
        // reload attachments data
        await this.$store.dispatch("loadAttachments", this.nomination._id)

      } catch (err) {
        console.error(err)
        this.message = {
          text: 'Attachment could not be deleted.',
          type: 'danger'
        }
      }
    },
    downloadAttachment (attachment) {
      const { _id='', file=null } = attachment || {};
      const { originalname='' } = file || {};
      this.message = {
        text: 'Downloading file...',
        type: 'info'
      }
      return app.get(
        `attachments/download/${_id}/`,
        {responseType: 'blob'}
      )
        .then(res => {
          saveAs(res.data, originalname);
          this.message = {
            text: 'File downloaded successfully!',
            type: 'success'
          }
        }).catch (err => {
          console.error(err)
          this.message = {
            text: 'Download failed.',
            type: 'danger'
          }
          return []
        })
    }
  }
};
</script>

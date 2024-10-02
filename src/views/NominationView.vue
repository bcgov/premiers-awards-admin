<template>
  <h2>Nomination #{{ selected.seq }}</h2>
  <Divider />
  <div class="grid">
    <div class="col-12 md:col-3"><b>Category</b></div>
    <div class="col-12 md:col-9">
      {{ settings.lookup("categories", selected.category) }}
    </div>
    <div class="col-12 md:col-3"><b>Status</b></div>
    <div class="col-12 md:col-9">
      <Tag
        v-if="selected.submitted"
        severity="success"
        icon="pi pi-lock"
        rounded
        >Submitted</Tag
      >
      <Tag v-else severity="warning" icon="pi pi-unlock" rounded>Draft</Tag>
    </div>
    <div class="col-12 md:col-3"><b>Owner</b></div>
    <div class="col-12 md:col-9">
      {{
        selected.owner && selected.owner.hasOwnProperty("username")
          ? selected.owner.username
          : "-"
      }}
    </div>
    <div class="col-12 md:col-3"><b>Acknowledgment</b></div>
    <div class="col-12 md:col-9">
      <Tag
        v-if="selected.acknowledgment"
        severity="success"
        icon="pi pi-check"
        rounded
        >Accepted</Tag
      >
      <Tag v-else severity="warning" icon="pi pi-times" rounded
        >Not Accepted</Tag
      >
    </div>
    <div v-if="hasSection('title')" class="col-12 md:col-3">
      <b>Title</b>
    </div>
    <div v-if="hasSection('title')" class="col-9">
      {{ selected.title }}
    </div>
    <div class="col-12 md:col-3">
      <b>Organizations</b>
    </div>
    <div class="col-12 md:col-9">
      <div v-for="organization in selected.organizations" class="grid">
        <div class="col-12 mb-2">
          {{ settings.lookup("organizations", organization) }}
        </div>
      </div>
    </div>
    <div v-if="hasSection('nominee')" class="col-12 md:col-3">
      <b>Nominee</b>
    </div>
    <div v-if="hasSection('nominee')" class="col-12 md:col-9">
      {{ selected.nominee.firstname }}
      {{ selected.nominee.lastname }}
    </div>
    <div v-if="hasSection('nominees')" class="col-12 md:col-3">
      <b>Nominees</b>
    </div>
    <div v-if="hasSection('nominees')" class="col-12 md:col-9">
      {{ selected.nominees }}
    </div>
    <div v-if="hasSection('partners')" class="col-12 md:col-3">
      <b>Partners</b>
    </div>
    <div v-if="hasSection('partners')" class="col-12 md:col-9">
      <div v-for="partner in selected.partners" class="grid">
        <div class="col-12 mb-2">{{ partner.organization }}</div>
      </div>
    </div>
    <div class="col-12">
      <h3>Contacts</h3>
    </div>
    <div class="col-12">
      <div class="grid">
        <div class="col-12 md:col-6">
          <h4>Nomination</h4>
          <div class="grid">
            <div class="col-12 md:col-3">First Name</div>
            <div class="col-12 md:col-9">
              {{ selected.contacts.primary.firstname }}
            </div>
            <div class="col-12 md:col-3">Last Name</div>
            <div class="col-12 md:col-9">
              {{ selected.contacts.primary.lastname }}
            </div>
            <div class="col-12 md:col-3">Email</div>
            <div class="col-12 md:col-9">
              {{ selected.contacts.primary.email }}
            </div>
            <div class="col-12 md:col-3">Phone</div>
            <div class="col-12 md:col-9">
              {{ selected.contacts.primary.phone }}
            </div>
          </div>
        </div>
        <div class="col-12 md:col-6">
          <h4>Video</h4>
          <div class="grid">
            <div class="col-12 md:col-3">First Name</div>
            <div class="col-12 md:col-9">
              {{ selected.contacts.video.firstname }}
            </div>
            <div class="col-12 md:col-3">Last Name</div>
            <div class="col-12 md:col-9">
              {{ selected.contacts.video.lastname }}
            </div>
            <div class="col-12 md:col-3">Email</div>
            <div class="col-12 md:col-9">
              {{ selected.contacts.video.email }}
            </div>
            <div class="col-12 md:col-3">Phone</div>
            <div class="col-12 md:col-9">
              {{ selected.contacts.video.phone }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 md:col-3"><b>Video Locations</b></div>
    <div class="col-12 md:col-9">
      <div class="mb-2" v-for="location in selected.contacts.video.locations">
        {{ location.address }}, {{ location.city }}
      </div>
    </div>
    <div v-if="hasSection('nominators')" class="col-12">
      <h3>Nominators</h3>
    </div>
    <div v-if="hasSection('nominators')" class="col-12">
      <DataTable
        :value="selected.nominators"
        :paginator="false"
        :rowHover="false"
        :loading="loading"
      >
        <template #empty> No nominators listed. </template>
        <template #loading> Loading nominators... </template>
        <Column field="lastname" header="Full Name" :sortable="true">
          <template #body="{ data }">
            {{ data.firstname }} {{ data.lastname }}
          </template>
        </Column>
        <Column field="title" header="Title" :sortable="true">
          <template #body="{ data }">
            {{ data.title }}
          </template>
        </Column>
        <Column field="email" header="Email" :sortable="true">
          <template #body="{ data }">
            {{ data.email }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-12">
      <h3>Evaluation</h3>
    </div>
    <div class="col-12">
      <div class="grid">
        <div class="col-12 md:col-2"><b>Summary</b></div>
        <div class="col-12 md:col-10" v-html="selected.evaluation.summary" />
        <div class="col-12 md:col-2"><b>Context</b></div>
        <div class="col-12 md:col-10" v-html="selected.evaluation.context" />
        <div v-if="hasEvaluation('complexity')" class="col-12 md:col-2">
          <b>Complexity</b>
        </div>
        <div
          v-if="hasEvaluation('complexity')"
          v-html="selected.evaluation.complexity"
          class="col-12 md:col-10"
        />
        <div v-if="hasEvaluation('approach')" class="col-12 md:col-2">
          <b>Approach</b>
        </div>
        <div
          v-if="hasEvaluation('approach')"
          v-html="selected.evaluation.approach"
          class="col-12 md:col-10"
        />
        <div v-if="hasEvaluation('valuing_people')" class="col-12 md:col-2">
          <b>Valuing People</b>
        </div>
        <div
          v-if="hasEvaluation('valuing_people')"
          v-html="selected.evaluation.valuing_people"
          class="col-12 md:col-10"
        />
        <div v-if="hasEvaluation('commitment')" class="col-12 md:col-2">
          <b>Commitment</b>
        </div>
        <div
          v-if="hasEvaluation('commitment')"
          v-html="selected.evaluation.commitment"
          class="col-12 md:col-10"
        />
        <div v-if="hasEvaluation('contribution')" class="col-12 md:col-2">
          <b>Contribution</b>
        </div>
        <div
          v-if="hasEvaluation('contribution')"
          v-html="selected.evaluation.contribution"
          class="col-12 md:col-10"
        />
        <div v-if="hasEvaluation('impact')" class="col-12 md:col-2">
          <b>Impact</b>
        </div>
        <div
          v-if="hasEvaluation('impact')"
          v-html="selected.evaluation.impact"
          class="col-12 md:col-10"
        />
      </div>
    </div>
    <div class="col-12"><h3>Attachments</h3></div>
    <div class="col-12">
      <DataTable
        :value="selected.attachments"
        :paginator="false"
        :rowHover="false"
        :loading="loading"
      >
        <template #empty> No saved attachments. </template>
        <template #loading> Loading attachments... </template>
        <Column
          field="label"
          header="Metadata"
          :sortable="true"
          style="width: 23rem"
        >
          <template #body="{ data }">
            <div>
              <b>{{ data.label || "(No Label)" }}</b>
            </div>
            <div>{{ data.description || "(No Description)" }}</div>
          </template>
        </Column>
        <Column field="originalname" header="File">
          <template #body="{ data }">
            {{
              data.file
                ? `${data.file.originalname} (${formatFileSize(
                    data.file.size
                  )})`
                : "(No File)"
            }}
          </template>
        </Column>
        <Column bodyStyle="text-align: center; overflow: visible;">
          <template #body="{ data }">
            <div class="p-buttonset">
              <Button icon="pi pi-download" @click="download(data)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router/dist/vue-router";
import { storeToRefs } from "pinia";
import { settingsStore } from "@/stores/settings.store";
import { nominationsDataStore } from "@/stores/nominations.store";
import { formatFileSize } from "@/services/util.services";

const indexRouter = useRouter();

// get current nomination
const { selected, loading } = storeToRefs(nominationsDataStore());
const store = nominationsDataStore();
const settings = settingsStore();

// get nomination settings
const nomination = settings.lookup("categories", selected.value.category, true);

// check if nomination section is
const hasSection = (section) => {
  return settings.checkSection(section, selected.value.category);
};
const hasEvaluation = (section) => {
  return (nomination.evaluation || []).includes(section);
};

// download attachment file to local drive
const download = async (attachment) => {
  await store.downloadAttachment(attachment);
};
</script>

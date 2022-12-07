<template>

  <ConfirmDialog group="nomination">
    <template #message="slotProps">
      <div class="card p-4">
        <div class="flex mb-5">
          <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
          <span class="pl-2">Delete this Nomination?</span></div>
      </div>
    </template>
  </ConfirmDialog>
  <div v-if="!loading" class="p-fluid grid">
    <div class="field col-3">
      <div class="nominations-menubar-fixed">
        <Menu :model="(nominationsStore.validate || []).map(item => {return {
          label: item.label,
          icon: item.valid ? 'pi pi-check' : 'pi pi-times',
          command: () => {
              indexRouter.push(`#${item.id}-fieldset`)
          }
        }})" />
        <div v-if="selected.submitted"><InlineMessage severity="info">Submitted</InlineMessage></div>
        <div v-if="v$.$invalid"><InlineMessage severity="warn">Form Incomplete</InlineMessage></div>
        <div v-else><InlineMessage severity="success">Ready to Submit!</InlineMessage></div>
<!--        <div v-for="error of v$.$errors" :key="error.$uid">-->
<!--          <InlineMessage>{{ error.$message }}</InlineMessage>-->
<!--        </div>-->
        <SplitButton
            :disabled="loading || selected.submitted"
            label="Save"
            @click="update"
            :model="[
                {label: 'Save Draft',icon: 'pi pi-save',command: update},
                {label: 'Submit Nomination',icon: 'pi pi-upload',command: submit}
              ]"
            class="p-button-success">
        </SplitButton>
        <div class="p-buttonset mt-5">
          <Button class="p-button-text" label="Cancel" icon="pi pi-times" @click="cancel" />
          <Button class="p-button-text" label="Delete" icon="pi pi-trash" @click="remove" />
        </div>
      </div>
    </div>
    <div class="field col-9">
      <Header :header="nomination.label" :lead="`Premier's Awards ${nomination.label} Nomination Form`" />
      <Message :closable="false" v-if="error" :severity="error.type">{{ error.text }}</Message>
      <div v-else-if="!loading">
        <div>
          <Tag class="m-1" v-if="selected.submitted" severity="success" icon="pi pi-lock" rounded>Submitted</Tag>
          <Tag class="m-1" v-else severity="warning" icon="pi pi-unlock" rounded>Draft</Tag>
          <Tag class="m-1" severity="info" icon="pi pi-user" rounded>
            {{selected.owner && selected.owner.hasOwnProperty('username') ? selected.owner.username : 'N/A'}}
          </Tag>
        </div>
        <NominationEmergingLeader v-if="category==='emerging-leader'" />
        <NominationInnovation v-if="category==='innovation'" />
        <NominationEvidenceDesign v-if="category==='evidence-based-design'" />
        <NominationLeadership v-if="category==='leadership'" />
        <NominationLegacy v-if="category==='legacy'" />
        <NominationOrgLeadership v-if="category==='organization-excellence'" />
        <NominationPartnership v-if="category==='partnership'" />
        <NominationRegionalImpact v-if="category==='regional-impact'" />
      </div>
      <Placeholder v-else />
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted, onUnmounted, reactive, ref} from "vue";
import {nominationsDataStore} from "@/stores/nominations.store";
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import NominationEmergingLeader from '@/components/forms/NominationEmergingLeaderForm.vue';
import NominationEvidenceDesign from '@/components/forms/NominationEvidenceDesignForm.vue';
import NominationInnovation from '@/components/forms/NominationInnovationForm.vue';
import NominationLeadership from '@/components/forms/NominationLeadershipForm.vue';
import NominationLegacy from '@/components/forms/NominationLegacyForm.vue';
import NominationOrgLeadership from '@/components/forms/NominationOrgExcellenceForm.vue';
import NominationPartnership from '@/components/forms/NominationPartnershipForm.vue';
import NominationRegionalImpact from '@/components/forms/NominationRegionalImpactForm.vue';
import messages from "@/services/message.services";
import {useToast} from "primevue/usetoast";
import {useConfirm} from "primevue/useconfirm";
import {useVuelidate} from "@vuelidate/core";
import settings from "@/services/settings.services";

const nominationsStore = nominationsDataStore();
const { selected, items, loading, error } = storeToRefs(nominationsDataStore());
const route = useRoute();
const indexRouter = useRouter();
const toast = useToast();
const confirm = useConfirm();

// get requested parameters
const {category=''} = route.params || {};
const nomination = settings.lookupCategory(category);

// apply validators
const v$ = useVuelidate();

// confirm dialog
const dialog = reactive({
  header: '',
  visible: false,
  callback: ()=>{}
});

// load init data
onBeforeMount(async() => {
  const {id=null} = route.params || {};
  await nominationsStore.getByID(id);
});

// cancel nomination submission
const cancel = () => {
  indexRouter.push({ name: 'list-nominations' });
};

// save nomination data
const update = nominationsStore.update;

// submit nomination as final
const submit = async () => {
  // check if form is valid
  const valid = nominationsStore.validate;
  if (!valid) return;

  // submit nomination
  await nominationsStore.submit();
};

// delete confirmation dialog
const remove = () => {
  confirm.require({
    group: 'nomination',
    message: selected.value,
    header: 'Confirm Deletion',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      await nominationsStore.remove();
    },
    reject: resetDialog,
    onHide: resetDialog
  });
};

// update item data
const resetDialog = () => {
  dialog.header = '';
  dialog.visible = false;
  dialog.callback = ()=>{};
};

// subscribe to store actions
nominationsStore.$onAction(
    ({name, store, _, after}) => {
      after(() => {
        // post message
        const {text=''} = messages.get(name) || {};
        if (store.getErrors) toast.add({
          severity: 'error', summary: 'An Error has Occurred', detail: store.getErrors.text, life: 3000});
        else if (store.getAttachmentErrors) toast.add({
          severity: 'error', summary: 'An Error has Occurred', detail: store.getAttachmentErrors.text, life: 3000});
        else if (text) {
          toast.add({severity: 'success', summary: 'Update Successful!', detail: text, life: 3000})
        }
      })
    }
);

// handle menu scroll effects
const menuClass = ref('nominations-menubar');
const onScroll = () => {
  menuClass.value = window.top.scrollY > 120
      ?  'nominations-menubar-fixed'
      : 'nominations-menubar';
}
onMounted(() => {
  window.addEventListener("scroll", onScroll)
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
});

</script>
<style>
.p-menu .p-menuitem-link .p-menuitem-text {
  background-color: transparent !important;
  color: rgba(0, 0, 0, 0.87) !important;
}
.nominations-menubar-fixed {
  overflow: hidden;
  position: fixed; /* Set the navbar to fixed position */
  top: 120px; /* Position the navbar at the top of the page */
  max-width: 260px;
  margin: auto;
  padding: 0;
  left: 8px;
}
</style>

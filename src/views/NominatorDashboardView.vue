<template>
  <Header
    header="Premier's Awards: Nomination Categories"
    lead="This provincial recognition is awarded to the most outstanding projects, teams or
      individuals in the public service, showcasing distinguished examples of professionalism,
      innovation and collaboration."
  />
  <Message
    :closable="false"
    v-if="items.length >= settings.lookup('maxDrafts')"
    severity="warn"
  >
    You are at the maximum allowed number ({{ items.length }}) of submitted and
    draft nominations.
  </Message>
  <Message :closable="false" v-else severity="info">
    You currently have ({{ items.length }} /
    {{ settings.lookup("maxDrafts") }} Maximum) submitted and draft nominations.
  </Message>
  <div class="card">
    <DataView
      :value="nominations"
      :layout="layout"
      :paginator="false"
      :rows="9"
    >
      <template #header>
        <div class="grid">
          <div class="col-12" style="text-align: right">
            <DataViewLayoutOptions
              aria-label="Layout Options"
              v-model="layout"
            />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="nomination-list-item grid">
            <div class="nomination-name col-12 md:col-3">
              <h4>{{ slotProps.data.label }}</h4>
            </div>
            <div class="nomination-description col-12 md:col-7">
              {{ slotProps.data.description }}
            </div>
            <div
              class="nomination-list-action col-12 md:col-2"
              style="text-align: right"
            >
              <Button
                label="Nominate"
                icon="pi pi-bookmark"
                @click="
                  () => {
                    navigate(slotProps.data.key);
                  }
                "
              />
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4 flex align-items-stretch">
          <Card class="m-2">
            <template #title>
              {{ slotProps.data.label }}
            </template>
            <template #content>
              <p>{{ slotProps.data.description }}</p>
            </template>
            <template #footer>

              <!-- PA-149 Disable nominations button if nominations are closed. -->

              <Button
              
                :label="nominationsOpen ? 'Create Nomination' : 'Nominations have closed'"
                :icon="{'pi':true, 'pi-bookmark': nominationsOpen, 'pi-exclamation-circle': !nominationsOpen}" 
                :disabled="(items.length >= settings.lookup('maxDrafts')) || !nominationsOpen" 
                @click="
                  ($event) => {
                    
                    nominate($event.target, slotProps.data.key);
                  }
                "
              />
            </template>
          </Card>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Header from "@/components/common/Header.vue";
import { useRouter } from "vue-router/dist/vue-router";
import { settingsStore } from "@/stores/settings.store";
import { nominationsDataStore } from "@/stores/nominations.store";
import { authDataStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

// initialize references
const { selected, items, loading, error } = storeToRefs(nominationsDataStore());
const { current, isRegistered } = storeToRefs(authDataStore());
const indexRouter = useRouter();
const auth = authDataStore();
const store = nominationsDataStore();
const settings = settingsStore();
const nominations = ref(settings.lookup("categories") || []);
const layout = ref("grid");

// PA-149 Gets the nominations open boolean from server. Defaults to true
const nominationsOpen = ref(true);
( async () => {

  const open = await store.isOpen;
  nominationsOpen.value = open;
})();

const nominate = async (btn, key) => {

  const open = await store.isOpen;

  if ( open ) {

    return navigate(key);
  } else {

    if ( btn.tagName == "SPAN" ) {

      btn.setAttribute("disabled", true);
      btn.innerHTML = "Nominations have closed";
    }
  }
}

const navigate = (category) => {
  indexRouter.push({
    name: "create-nomination",
    params: { category: category },
  });
};

onMounted(async () => {
  // load only nominations for GUID
  await store.getByGUID(current.value.guid || "");
});
</script>

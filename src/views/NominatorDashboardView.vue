<template>
  <Header
      header="Premier's Awards: Nomination Categories"
      lead="This provincial recognition is awarded to the most outstanding projects, teams or
      individuals in the public service, showcasing distinguished examples of professionalism,
      innovation and collaboration." />
  <Message :closable="false" v-if="items.length > settings.get('maxDrafts')" severity="warning">
    You are at the maximum allowed number ({{items.length}}) of submitted and draft nominations.
  </Message>
  <Message :closable="false" v-else severity="info">
    You currently have ({{items.length}} / {{ settings.get('maxDrafts') }} Maximum) submitted and draft nominations.
  </Message>
  <div class="card">
    <DataView
        :value="nominations"
        :layout="layout"
        :paginator="false"
        :rows="9"
        sortField="label"
    >
      <template #header>
        <div class="grid">
          <div class="col-12" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="nomination-list-item grid">
            <div class="nomination-name col-12 md:col-3"><h4>{{slotProps.data.label}}</h4></div>
            <div class="nomination-description col-12 md:col-7">{{slotProps.data.description}}</div>
            <div class="nomination-list-action col-12 md:col-2" style="text-align: right">
              <Button label="Nominate" icon="pi pi-bookmark" @click="()=>{navigate(slotProps.data.key)}" />
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4 flex align-items-stretch">
          <Card class="m-2">
            <template #title>
              {{slotProps.data.label}}
            </template>
            <template #content>
              <p>{{slotProps.data.description}}</p>
            </template>
            <template #footer>
              <Button label="Nominate" icon="pi pi-bookmark" @click="()=>{navigate(slotProps.data.key)}" />
            </template>
          </Card>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import Header from "@/components/common/Header.vue";
import {useRouter} from "vue-router/dist/vue-router";
import settings from "@/services/settings.services";
import {nominationsDataStore} from "@/stores/nominations.store";
import {authDataStore} from "@/stores/auth.store";
import {storeToRefs} from "pinia";

// initialize references
const { selected, items, loading, error } = storeToRefs(nominationsDataStore());
const { current } = storeToRefs(authDataStore());
const indexRouter = useRouter();
const auth = authDataStore();
const store = nominationsDataStore();
const nominations = ref(settings.get('categories') || []);
const layout = ref('grid');

const navigate = (category) => {
  indexRouter.push({name: 'create-nomination', params: {category: category}});
}

onMounted(async() => {
  await store.getByGUID(current.value.guid || '');
})
</script>

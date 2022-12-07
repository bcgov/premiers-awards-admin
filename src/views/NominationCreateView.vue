<template>
  <Message :closable="false" v-if="error" :severity="error.type">{{ error.text }}</Message>
  <Placeholder v-else />
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import {nominationsDataStore} from "@/stores/nominations.store";
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";

const store = nominationsDataStore();
const { selected, items, loading, error } = storeToRefs(nominationsDataStore());
const route = useRoute();
const indexRouter = useRouter();

// load init data
onBeforeMount(async() => {
  const {category=''} = route.params || {};
  const nomination = await store.create(category);

  // redirect to edit page upon creation
  const { _id='' } = nomination || {};
  if (!error.value && !loading.value)
    await indexRouter.push({name: 'edit-nomination', params: {category: category, id: _id}});
});

</script>

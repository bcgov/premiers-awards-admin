<template>
  <Header header="Create New User" />
  <Placeholder v-if="loading" />
  <div>
    <UserFieldset mode="new" />
    <div class="card m-5">
      <div style="text-align: right">
          <Button :disabled="loading || done" label="Cancel" icon="pi pi-times" @click="cancel" class="p-button-text"/>
          <Button :disabled="loading || done" label="Submit" icon="pi pi-check" @click="submit" autofocus />
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";
import { usersDataStore } from "@/stores/users.store";
import {useRouter} from "vue-router";
import {useVuelidate} from "@vuelidate/core";
import {storeToRefs} from "pinia";
import UserFieldset from "@/components/fieldsets/UserFieldset.vue";

// get indexRouter
const indexRouter = useRouter();
// validator
const v$ = useVuelidate();
// users store
const store = usersDataStore();
// initialize references
const { loading } = storeToRefs(usersDataStore());
const done = ref(false);

// create new user record
const submit = async () => {
  // validate form
  if (invalid()) return;

  // insert new record
  await store.insert();
  if (store.getErrors) return;
  done.value = true;
  // redirect to users list
  await indexRouter.push({ name: 'users-list' });
};

// cancel registration (navigates to users list)
const cancel = () => {
  indexRouter.push({ name: 'users-list' });
};
// test if form is invalid
const invalid = () => {
  v$.value.$touch();
  return v$.value.$invalid;
}

</script>

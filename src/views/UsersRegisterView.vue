<template>
  <div>
    <IndexFieldset type="users" mode="new" />
    <div>
      <Button :disabled="done" label="Cancel" icon="pi pi-times" @click="cancel" class="p-button-text"/>
      <Button :disabled="done" label="Submit" icon="pi pi-check" @click="submit" autofocus />
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import { usersDataStore } from "@/stores/users.store";
import IndexFieldset from "@/components/fieldsets/IndexFieldset.vue";
import { useToast } from "primevue/usetoast";
import messages from "@/services/message.services"
import {useRouter} from "vue-router";
import {useVuelidate} from "@vuelidate/core";

// initialize messages
const toast = useToast();

// get router
const router = useRouter();

// validator
const v$ = useVuelidate();

// initialize references
const store = usersDataStore();
const done = ref(false);

// subscribe to store actions
store.$onAction(
    ({name, store, _, after}) => {
      after(() => {
        // post message
        const {text=''} = messages.get(name) || {};
        if (store.getErrors) toast.add({
          severity: 'error', summary: 'An Error has Occurred', detail: store.getErrors.text, life: 3000});
        else if (text) {
          toast.add({severity: 'success', summary: 'User Registration Successful!', detail: text, life: 3000})
        }
      })
    }
);

// create new user record
const submit = async () => {
  // validate form
  if (invalid()) return;

  // insert new record
  await store.insert();
  if (store.getErrors) return;
  done.value = true;
  // redirect to users list
  await router.push({name: 'users-list'});
};

// cancel registration (navigates to users list)
const cancel = () => {
  router.push({ name: 'users-list' });
};
// test if form is invalid
const invalid = () => {
  v$.value.$touch();
  return v$.value.$invalid;
}

</script>

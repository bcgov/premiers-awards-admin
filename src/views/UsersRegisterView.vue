<template>
  <Header header="User Registration" />
  <Placeholder v-if="loading" />
  <div>
    <Message v-if="isRegistered" severity="info" :closable="false">
      Your registration is currently under review. An administrator must approve your registration to allow
      access to the site. Please check back regularly for updates.
    </Message>
    <UserFieldset mode="new" :disable="isRegistered" />
    <div class="card m-5">
      <div style="text-align: right">
          <Button
              :disabled="isRegistered || loading || done"
              :label="isRegistered ? 'Registered' : 'Register'"
              icon="pi pi-check"
              @click="submit"
              autofocus
          />
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import { usersDataStore } from "@/stores/users.store";
import {useRouter} from "vue-router";
import {useVuelidate} from "@vuelidate/core";
import {storeToRefs} from "pinia";
import UserFieldset from "@/components/fieldsets/UserFieldset.vue";
import {useToast} from "primevue/usetoast";
import messages from "@/services/message.services";
import {authDataStore} from "@/stores/auth.store";

// get indexRouter
const indexRouter = useRouter();
// validator
const v$ = useVuelidate();
// initialize messages
const toast = useToast();
// users store
const store = usersDataStore();
// get current user
const { isRegistered } = storeToRefs(authDataStore());
// initialize references
const { loading, selected } = storeToRefs(usersDataStore());
const done = ref(false);

// load current user data into store
onMounted(store.getCurrent);

// subscribe to user store actions
store.$onAction(
    ({name, store, _, after}) => {
      after(() => {
        // post message
        const {text='', type=''} = messages.get(name) || {};
        if (text) {
          toast.add({severity: type, summary: text, detail: text, life: 3000})
        }
        if (store.getErrors) toast.add({
          severity: 'error', summary: 'An Error has Occurred', detail: store.getErrors.text, life: 3000});
      })
    }
);

// create new user record
const submit = async () => {
  // validate form
  if (invalid()) return;

  // insert new record
  await store.register();
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

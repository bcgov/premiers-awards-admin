<template>
  <Fieldset :legend="heading">
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="user_guid"
                  type="text"
                  v-model="selected.guid"
                  @change.native="v$.guid.$touch()"
                  :class="v$.guid.$invalid ? 'p-invalid' : ''"
                  :disabled="true"
              />
              <label for="user_guid">GUID</label>
          </span>
          <p v-for="error of v$.guid.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="user_username"
                  type="text"
                  v-model="selected.username"
                  @change.native="v$.username.$touch()"
                  :class="v$.username.$invalid ? 'p-invalid' : ''"
                  :disabled="true"
              />
              <label for="user_username">IDIR</label>
          </span>
          <p v-for="error of v$.username.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="user_firstname"
                  type="text"
                  v-model="selected.firstname"
                  :class="v$.firstname.$invalid ? 'p-invalid' : ''"
                  @change.native="v$.firstname.$touch()"
                  :disabled="disable"
              />
              <label for="user_firstname">First Name</label>
          </span>
          <p v-for="error of v$.firstname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="user_lastname"
                  type="text"
                  v-model="selected.lastname"
                  :class="v$.lastname.$invalid ? 'p-invalid' : ''"
                  @change.native="v$.lastname.$touch()"
                  :disabled="disable"
              />
              <label for="user_lastname">Last Name</label>
          </span>
          <p v-for="error of v$.lastname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="user_email"
                  type="email"
                  v-model="selected.email"
                  :class="v$.email.$invalid ? 'p-invalid' : ''"
                  @change.native="v$.email.$touch()"
                  :disabled="disable"
              />
              <label for="user_email">Email</label>
          </span>
          <p v-for="error of v$.email.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
            <MultiSelect
                id="user_roles"
                aria-label="User Roles"
                v-model="selected.roles"
                :options="roles"
                optionLabel="label"
                optionValue="key"
                @change.native="v$.roles.$touch()"
                :disabled="isCurrent || isNew || disable"
                :class="v$.roles.$invalid ? 'p-invalid' : ''"
                :showToggleAll="false"
                style="width:15rem;"
            />
              <label>Roles</label>
          </span>
          <p v-for="error of v$.roles.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
      </div>
    </div>
  </Fieldset>
</template>

<script setup>
import { usersDataStore } from "@/stores/users.store";
import settings from "@/services/settings.services";
import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import { email, required } from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {ref} from "vue";

// properties
const props = defineProps(['mode', 'disable']);
const isNew = props.mode === 'new';
const heading = isNew ? 'Register New User' : 'Edit User Data';

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, error } = storeToRefs(usersDataStore());

// freeze role change for self edits
const isCurrent = ref(selected.value.guid === current.value.guid);

// get options for user roles
const roles = settings.get('roles') || [];

// // custom validators
// const notCurrentGUID = (value) => value !== current.value.guid;
// const notCurrentUsername = (value) => value !== current.value.username;
//     notCurrentGUID: helpers.withMessage("Cannot create user with current GUID.", notCurrentGUID)
//     notCurrentUsername: helpers.withMessage("Cannot create user with current username.", notCurrentUsername)

// apply validators
const v$ = useVuelidate({
  guid: { required },
  username: { required },
  firstname: { required },
  lastname: { required },
  email: { required, email },
  roles: { required }
}, selected);

</script>
<style>
  .p-multiselect-panel {
    z-index: 2000 !important;
  }
</style>

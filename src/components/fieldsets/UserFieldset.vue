<template>
  <Fieldset :legend="heading">
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  type="text"
                  v-model="selected.guid"
                  @change.native="v$.guid.$touch()"
                  :class="v$.guid.$invalid && isNew ? 'p-invalid' : ''"
                  :disabled="!isNew"
              />
              <label for="lastname">GUID</label>
          </span>
          <p v-if="isNew" v-for="error of v$.guid.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  type="text"
                  v-model="selected.username"
                  @change.native="v$.username.$touch()"
                  :class="v$.username.$invalid && isNew ? 'p-invalid' : ''"
                  :disabled="!isNew"
              />
              <label for="lastname">IDIR</label>
          </span>
          <p v-if="isNew" v-for="error of v$.username.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  type="text"
                  v-model="selected.firstname"
                  @change.native="v$.firstname.$touch()"
              />
              <label for="firstname">First Name</label>
          </span>
          <p v-for="error of v$.firstname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  type="text"
                  v-model="selected.lastname"
                  @change.native="v$.lastname.$touch()"
              />
              <label for="lastname">Last Name</label>
          </span>
          <p v-for="error of v$.lastname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  type="email"
                  v-model="selected.email"
                  @change.native="v$.email.$touch()"
              />
              <label for="email">Email</label>
          </span>
          <p v-for="error of v$.email.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <Dropdown
                  :options="roles"
                  v-model="selected.role"
                  optionLabel="text"
                  optionValue="value"
                  @change.native="v$.role.$touch()"
                  :class="v$.role.$invalid ? 'p-invalid' : ''"
                  :disabled="isCurrent || isNew"
                  style="width:15rem"
              />
              <label for="role">Role</label>
          </span>
          <p v-for="error of v$.role.$errors" :key="error.$uid">
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
import {email, required, helpers} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {ref} from "vue";

// properties
const props = defineProps(['mode']);
const isNew = props.mode === 'new';
const heading = isNew ? 'Create New User' : 'Edit User Data';

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, error } = storeToRefs(usersDataStore());

// freeze role change for self edits
const isCurrent = ref(selected.value.guid === current.value.guid);

// get options for user roles
const roles = settings.get('roles') || [];

// custom validators
const notCurrentGUID = (value) => value !== current.value.guid;
const notCurrentUsername = (value) => value !== current.value.username;

// init validations
const validations = {
  guid: {
    required,
    notCurrentGUID: helpers.withMessage("Cannot create user with current GUID.", notCurrentGUID)
  },
  username: {
    required,
    notCurrentUsername: helpers.withMessage("Cannot create user with current username.", notCurrentUsername)
  },
  firstname: { required },
  lastname: { required },
  email: { required, email },
  role: { required }
};

// apply validators
const v$ = useVuelidate(validations, selected);

</script>

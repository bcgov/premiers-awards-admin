<template>
  <div id="organization-fieldset">
    <h3>Organization</h3>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <Dropdown
              :disabled="submitted"
              :options="orgs"
              v-model="selected.organization"
              @select="v$.organization.$touch()"
              optionLabel="label"
              optionValue="key"
              placeHolder="Select an organization"
          />
          <p v-for="error of v$.organization.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
      </div>
    </div>
  </div><!-- End Organization -->
</template>

<script setup>

import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import {useVuelidate} from "@vuelidate/core";
import {nominationsDataStore} from "@/stores/nominations.store";
import settings from "@/services/settings.services";
import {helpers, required} from "@vuelidate/validators";

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, submitted, error, loading } = storeToRefs(nominationsDataStore());

// apply validators
const v$ = useVuelidate({organization: {required}}, selected);

// get list of organizations
const orgs = settings.get('organizations');

</script>


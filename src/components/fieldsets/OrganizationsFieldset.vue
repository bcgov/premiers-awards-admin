<template>
  <div id="organizations-fieldset">
    <h3>Organizations</h3>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <p>Include one or more organizations sponsoring this nomination.</p>
          <MultiSelect
            aria-label="Organizations"
            v-model="selected.organizations"
            :options="orgs"
            optionLabel="label"
            optionValue="key"
            @change.native="v$.organizations.$touch()"
            :disabled="selected.submitted"
            :class="v$.organizations.$invalid ? 'p-invalid' : ''"
            :showToggleAll="false"
            display="chip"
            placeholder="Select one or more organizations"
          />
          <p v-for="error of v$.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- End Organizations -->
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { nominationsDataStore } from "@/stores/nominations.store";
import { settingsStore } from "@/stores/settings.store";
import { required } from "@vuelidate/validators";

// initialize references
const { selected, items, loading, error } = storeToRefs(nominationsDataStore());
const store = nominationsDataStore();
const settings = settingsStore();

// get list of organizations
const orgs = settings.lookup("organizations");

// apply validators
const v$ = useVuelidate({ organizations: { required } }, selected);
</script>

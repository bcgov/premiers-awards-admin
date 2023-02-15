<template>
  <Fieldset :legend="heading">
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="setting_type"
                  type="text"
                  v-model="selected.type"
                  @change.native="v$.type.$touch()"
                  :class="v$.type.$invalid ? 'p-invalid' : ''"
              />
              <label for="setting_type">Type</label>
          </span>
          <p v-for="error of v$.type.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="setting_label"
                  type="text"
                  v-model="selected.label"
                  @change.native="v$.label.$touch()"
                  :class="v$.label.$invalid ? 'p-invalid' : ''"
              />
              <label for="setting_label">Label</label>
          </span>
          <p v-for="error of v$.label.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="setting_value"
                  type="text"
                  v-model="selected.value"
                  :class="v$.value.$invalid ? 'p-invalid' : ''"
                  @change.native="v$.value.$touch()"
                  :disabled="disable"
              />
              <label for="setting_value">Value</label>
          </span>
          <p v-for="error of v$.value.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
      </div>
    </div>
  </Fieldset>
</template>

<script setup>

import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import { required } from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {settingsStore} from "@/stores/settings.store";

// properties
const props = defineProps(['mode', 'disable']);
const isNew = props.mode === 'new';
const heading = isNew ? 'Create New Setting' : 'Edit Setting';

// get current user
const { current } = storeToRefs(authDataStore());

// load settings state
const { selected, error } = storeToRefs(settingsStore());

// apply validators
const v$ = useVuelidate({
  type: { required },
  label: { required },
  value: { required },
}, selected);

</script>
<style>
  .p-multiselect-panel {
    z-index: 2000 !important;
  }
</style>

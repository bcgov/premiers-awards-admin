<template>
  <div class="card">
    <div class="p-fluid grid">
      <div class="field col-12 md:col-6">
        <span class="p-float-label">
          <InputText
              :disabled="submitted"
              :id="`location_${index}_address`"
              type="text"
              v-model="location.address"
              @input="v$.address.$touch()"
              :class="v$.address.$invalid ? 'p-invalid' : ''"
          />
          <label :for="`location_${index}_address`">Address</label>
        </span>
        <div v-for="error of v$.address.$errors" :key="error.$uid">
          <InlineMessage>{{ error.$message }}</InlineMessage>
        </div>
      </div>
      <div class="field col-12 md:col-6">
        <span class="p-float-label">
          <InputText
              :id="`location_${index}_city`"
              type="text"
              v-model="location.city"
              @input="v$.city.$touch()"
              :class="v$.city.$invalid ? 'p-invalid' : ''"
          />
          <label :for="`location_${index}_city`">City</label>
        </span>
        <div v-for="error of v$.city.$errors" :key="error.$uid">
          <InlineMessage>{{ error.$message }}</InlineMessage>
        </div>
      </div>
    </div>
  </div><!-- End Video Location -->
</template>

<script setup>

import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {storeToRefs} from "pinia";
import {nominationsDataStore} from "@/stores/nominations.store";

// load nomination state
const { selected, submitted, error } = storeToRefs(nominationsDataStore());

// define data prop
const props = defineProps({
  location: Object,
  index: Number
});

// apply validators
const v$ = useVuelidate({
  address: {required},
  city: {required},
}, props.location);

</script>
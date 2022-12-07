<template>
  <div>
    <span class="p-float-label">
      <InputText
          :disabled="submitted"
          id="organization"
          type="text"
          v-model="partner.organization"
          @input="v$.organization.$touch()"
          :class="v$.organization.$invalid ? 'p-invalid' : ''"
      />
      <label for="organization">Organization</label>
    </span>
    <div v-for="error of v$.organization.$errors" :key="error.$uid">
      <InlineMessage>{{ error.$message }}</InlineMessage>
    </div>
  </div><!-- End Partner -->
</template>

<script setup>

import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {storeToRefs} from "pinia";
import {nominationsDataStore} from "@/stores/nominations.store";

// load users state
const { selected, submitted, error } = storeToRefs(nominationsDataStore());

// define data prop
const props = defineProps({
  partner: Object,
  index: Number
});

// apply validators
const v$ = useVuelidate({
  organization: {required},
}, props.partner);

</script>
<template>
  <div id="acknowledgment-fieldset">
    <Fieldset legend="Contact Acknowledgment">
      <p>If your nomination is selected as a finalist, the process is a time commitment for the finalist group involving approximately 20 hours to coordinate video filming schedules, organize interviewees and b-roll, and communicate frequently with the Premier’s Awards team. Please indicate below that the potential finalist group for this nomination is aware of their nomination, and of the potential time commitment should they be selected as a finalist.</p>
      <div class="card">
        <div class="p-fluid grid">
          <div class="field col-12 md:col-6">
            <div class="field-checkbox">
              <ToggleButton
                  inputId="acknowledgement"
                  :disabled="submitted"
                  v-model="selected.acknowledgment"
                  :inputClass="v$.acknowledgment.$invalid ? 'p-invalid' : 'green'"
                  onLabel="Yes, they have been informed"
                  offLabel="Not confirmed"
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                  @change.native="v$.acknowledgment.$touch()"
                  aria-label="Confirmation"
              />
            </div>
            <div v-for="error of v$.acknowledgment.$errors" :key="error.$uid">
              <InlineMessage>{{ error.$message }}</InlineMessage>
            </div>
          </div>
        </div>
      </div>
    </Fieldset>
  </div><!-- End Acknowledgment -->
</template>

<script setup>
import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import {useVuelidate} from "@vuelidate/core";
import {nominationsDataStore} from "@/stores/nominations.store";
import {helpers, required} from "@vuelidate/validators";

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, submitted, error } = storeToRefs(nominationsDataStore());

const validate = (value) => { console.log(value); return !!value };

// apply validators
const v$ = useVuelidate({
  acknowledgment: {
    required: helpers.withMessage('This field cannot be empty', required)}
}, selected.value);
</script>

<template>
  <div id="acknowledgment-fieldset">
    <Fieldset legend="Acknowledgment">
      <p class="mb-0">
        I understand there is a 20-hour (approx.) time commitment required of
        the contact and the group involved with the nomination, should it be
        selected as a finalist. This time is used to communicate frequently with
        the Premier’s Awards team and to coordinate video filming, including
        scheduling shoots for footage and interviewees.
      </p>
      <!-- <div class="card">
        <div class="p-fluid grid">
          <div class="field col-12 md:col-6">
            <div class="field-checkbox">
              <ToggleButton
                  inputId="acknowledgment"
                  :disabled="submitted"
                  v-model="selected.acknowledgment"
                  onLabel="Confirmed"
                  offLabel="Click to Confirm"
                  onIcon="pi pi-check"
                  @input="v$.acknowledgment.$touch()"
                  aria-label="Confirmation"
              />
            </div>
          </div>
          <div
              class="field col-12 md:col-6"
              v-if="(validate || []).filter(item => item.id === 'acknowledgment' && item.valid).length === 0"
          >
            <InlineMessage severity="warn">Please confirm this acknowledgment.</InlineMessage>
          </d>
        </div>
      </div> -->
      <div class="card">
        <div class="p-fluid grid">
          <div class="field col-12 md:col-12">
            <div class="field-checkbox mb-0">
              <Checkbox v-model="selected.acknowledgment" :binary="true" />
              <p class="ml-2">
                I confirm the individual or group for this nomination is aware
                they’ve been nominated and is willing and able to make the
                required time commitment should they be selected as a finalist.
              </p>
            </div>
            <div
              class="field col-6"
              v-if="
                (validate || []).filter(
                  (item) => item.id === 'acknowledgment' && item.valid
                ).length === 0
              "
            >
              <InlineMessage severity="warn"
                >Please confirm this acknowledgment.</InlineMessage
              >
            </div>
          </div>
        </div>
      </div>
    </Fieldset>
  </div>
  <!-- End Acknowledgment -->
</template>

<script setup>
import { storeToRefs } from "pinia/dist/pinia";
import { authDataStore } from "@/stores/auth.store";
import { useVuelidate } from "@vuelidate/core";
import { nominationsDataStore } from "@/stores/nominations.store";
import { required } from "@vuelidate/validators";

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, submitted, error, validate } = storeToRefs(
  nominationsDataStore()
);

// apply validators
const v$ = useVuelidate({ acknowledgment: { required } }, selected);
</script>

<template>
  <!-- id -->
  <div id="acknowledgment_nominee-fieldset">
    <Fieldset legend="Nominee Acknowledgment">
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
              <Checkbox
                v-model="selected.acknowledgment_nominee"
                :binary="true"
              />
              <p class="ml-2">
                I confirm the
                {{
                  selected.category === "regional-impact" ||
                  selected.category === "partnership" ||
                  selected.category === "innovation" ||
                  selected.category === "organizational-excellence"
                    ? "group"
                    : "individual"
                }}
                nominated is aware they are being nominated and can make the
                required time commitment if they are selected as a finalist.
              </p>
            </div>
            <div
              class="field col-6"
              v-if="
                (validate || []).filter(
                  (item) => item.id === 'acknowledgment_nominee' && item.valid,
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
  nominationsDataStore(),
);

// apply validators
const v$ = useVuelidate({ acknowledgment_nominee: { required } }, selected);
</script>

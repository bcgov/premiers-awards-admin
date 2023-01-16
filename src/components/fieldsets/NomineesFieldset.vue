<template>
  <div id="nominees-fieldset"><!-- Number of Nominees -->
    <h3>Nominees</h3>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <p>
            A nominee is an individual team member essential to the success of the nominated project
            or initiative. A nominee should be significantly involved in the development and work of
            the nominated project and initiative.
          </p>
          <p>
            Please consider retaining a list of names for your organization’s purpose should this
            nomination be selected as a finalist for award distribution.
          </p>
          <p>
            Please enter the number of individuals who played a significant role in the initiative,
            program or project.
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <label for="nominees">Enter the Number of Nominees</label>
          <InputNumber
              :disabled="submitted"
              inputId="nominees"
              v-model="selected.nominees"
              showButtons
              :min="0"
              :max="500"
          />
          <p v-for="error of v$.nominees.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
      </div>
    </div>
  </div><!-- End Number of Nominees -->
</template>

<script setup>

import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import {useVuelidate} from "@vuelidate/core";
import {nominationsDataStore} from "@/stores/nominations.store";
import {required} from "@vuelidate/validators";

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, submitted, error } = storeToRefs(nominationsDataStore());

// apply validators
const v$ = useVuelidate({
  nominees: {required}
}, selected);

</script>

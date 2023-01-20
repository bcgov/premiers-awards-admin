<template>
  <div id="nominee-fieldset">
    <h3>Nominee</h3>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12 md:col-6">
              <span class="p-float-label">
                <InputText
                    id="`nominee_firstname`"
                    type="text"
                    v-model="selected.nominee.firstname"
                    @input="v$.firstname.$touch()"
                    :class="v$.firstname.$invalid ? 'p-invalid' : ''"
                />
                <label for="nominee_firstname">First Name</label>
              </span>
          <div v-for="error of v$.firstname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
        <div class="field col-12 md:col-6">
              <span class="p-float-label">
                <InputText
                    id="nominee_lastname"
                    type="text"
                    v-model="selected.nominee.lastname"
                    @input="v$.lastname.$touch()"
                    :class="v$.lastname.$invalid ? 'p-invalid' : ''"
                />
                <label for="nominee_lastname">Last Name</label>
              </span>
          <div v-for="error of v$.lastname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import {useVuelidate} from "@vuelidate/core";
import {nominationsDataStore} from "@/stores/nominations.store";
import { required } from "@vuelidate/validators";

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, submitted, error, loading } = storeToRefs(nominationsDataStore());

// apply validators
const v$ = useVuelidate({
  firstname: {required},
  lastname: {required},
}, selected.value.nominee);

</script>
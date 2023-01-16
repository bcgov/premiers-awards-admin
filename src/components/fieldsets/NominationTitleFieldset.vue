<template>
  <div id="title-fieldset">
    <h3>Nomination Title</h3>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <span class="p-float-label">
            <InputText
                :disabled="submitted"
                id="title"
                type="text"
                v-model="selected.title"
                @input="v$.title.$touch()"
                :class="v$.title.$invalid ? 'p-invalid' : ''"
            />
            <label for="title">Title</label>
          </span>
          <div v-for="error of v$.title.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
      </div>
    </div>
  </div><!-- End Nomination Title Fieldset -->
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
const v$ = useVuelidate({title: {required}}, selected.value);

</script>
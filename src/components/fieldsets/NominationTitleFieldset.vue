<template>
  <div id="title-fieldset">
    <h3>Nomination Title</h3>
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <span class="p-float-label">
            <InputText
                :disabled="submitted"
                id="nomination_title"
                type="text"
                v-model="selected.title"
                @input="v$.title.$touch()"
                :class="v$.title.$invalid ? 'p-invalid' : ''"
            />
            <label for="nomination_title">Title</label>
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
import {required, helpers} from "@vuelidate/validators";
import { settingsStore } from "@/stores/settings.store";

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, submitted, error } = storeToRefs(nominationsDataStore());

/* 
  (PA-156) Added max word length to Nomination title. Value should be defined in settings as:

 { "type": "nominations", "label": "Entry for nominations max title length, etc", "value": {"maxTitle": 7} } 

*/
const settings = settingsStore();
const nominationsSettings = settings.lookup("nominations") || { maxTitle: 7 };
// apply validators
const v$ = useVuelidate({
    title: {
      required, 
      count: helpers.withMessage(
        ({
          /*
          $pending,
          $invalid,
          $params,
          $model
          */
        }) => `Maximum length of ${nominationsSettings.maxTitle} words`,
        (v) => v.split(/\s/).length <= nominationsSettings.maxTitle
      )
    }
  }, 
  selected
);

</script>
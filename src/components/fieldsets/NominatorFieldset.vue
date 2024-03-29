<template>
  <Fieldset :legend="`Nominator ${index + 1}`" :toggleable="true">
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
            <InputText
              :id="`nominator_${index}_firstname`"
              :disabled="submitted"
              type="text"
              v-model="nominator.firstname"
              @input="v$.firstname.$touch()"
              :class="v$.firstname.$invalid ? 'p-invalid' : ''"
            />
            <label :for="`nominator_${index}_firstname`">First Name</label>
          </span>
          <div v-for="error of v$.firstname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
            <InputText
              :id="`nominator_${index}_lastname`"
              :disabled="submitted"
              type="text"
              v-model="nominator.lastname"
              @input="v$.lastname.$touch()"
              :class="v$.lastname.$invalid ? 'p-invalid' : ''"
            />
            <label :for="`nominator_${index}_lastname`">Last Name</label>
          </span>
          <div v-for="error of v$.lastname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
            <InputText
              :disabled="submitted"
              :id="`nominator_${index}_title`"
              type="text"
              v-model="nominator.title"
              @input="v$.title.$touch()"
              :class="v$.title.$invalid ? 'p-invalid' : ''"
            />
            <label :for="`nominator_${index}_title`">Title</label>
          </span>
          <div v-for="error of v$.title.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>

        <div class="field col-12 md:col-6">
          <span class="p-float-label">
            <InputText
              :disabled="submitted"
              :id="`nominator_${index}_email`"
              type="email"
              v-model="nominator.email"
              @input="v$.email.$touch()"
              :class="v$.email.$invalid ? 'p-invalid' : ''"
            />
            <label :for="`nominator_${index}_email`">Email</label>
          </span>
          <div v-for="error of v$.email.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>

        <div class="field col-12 md:col-6">
          <span class="p-float-label">
            <InputText
              :disabled="submitted"
              :id="`nominator_${index}_branch`"
              type="text"
              v-model="nominator.branch"
              @input="v$.branch.$touch()"
              :class="v$.branch.$invalid ? 'p-invalid' : ''"
            />
            <label :for="`nominator_${index}_branch`">Branch</label>
          </span>
          <div v-for="error of v$.branch.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
            <InputText
              :disabled="submitted"
              :id="`nominator_${index}_division`"
              type="text"
              v-model="nominator.division"
              @input="v$.division.$touch()"
              :class="v$.division.$invalid ? 'p-invalid' : ''"
            />
            <label :for="`nominator_${index}_division`">Division</label>
          </span>
          <div v-for="error of v$.division.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
      </div>
    </div>
  </Fieldset>
</template>

<script setup>
import { storeToRefs } from "pinia/dist/pinia";
import { authDataStore } from "@/stores/auth.store";
import { useVuelidate } from "@vuelidate/core";
import { nominationsDataStore } from "@/stores/nominations.store";
import { required, email } from "@vuelidate/validators";

// define data prop
const props = defineProps({
  nominator: Object,
  index: Number,
});

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, submitted, error } = storeToRefs(nominationsDataStore());

// apply validators
const v$ = useVuelidate(
  {
    firstname: { required },
    lastname: { required },
    title: { required },
    email: { required, email },
    branch: { required },
    division: { required },
  },
  props.nominator
);
</script>

<template>
  <Fieldset :legend="legend" :toggleable="true">
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12">
          <slot name="overview"></slot>
        </div>
        <div class="field col-12 md:col-6">
              <span class="p-float-label">
                <InputText
                    :disabled="submitted"
                    :id="`contact_${type}_firstname`"
                    type="text"
                    v-model="contact.firstname"
                    @input="v$.firstname.$touch()"
                    :class="v$.firstname.$invalid ? 'p-invalid' : ''"
                />
                <label :for="`contact_${type}_firstname`">First Name</label>
              </span>
          <div v-for="error of v$.firstname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
        <div class="field col-12 md:col-6">
              <span class="p-float-label">
                <InputText
                    :disabled="submitted"
                    :id="`contact_${type}_lastname`"
                    type="text"
                    v-model="contact.lastname"
                    @input="v$.lastname.$touch()"
                    :class="v$.lastname.$invalid ? 'p-invalid' : ''"
                />
                <label :for="`contact_${type}_lastname`">Last Name</label>
              </span>
          <div v-for="error of v$.lastname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
        <div class="field col-12 md:col-6">
              <span class="p-float-label">
                <InputText
                    :disabled="submitted"
                    :id="`contact_${type}_email`"
                    type="email"
                    v-model="contact.email"
                    @input="v$.email.$touch()"
                    :class="v$.email.$invalid ? 'p-invalid' : ''"
                />
                <label :for="`contact_${type}_email`">Email</label>
              </span>
          <div v-for="error of v$.email.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
        <div class="field col-12 md:col-6">
              <span class="p-float-label">
                <InputMask
                    :disabled="submitted"
                    :id="`contact_${type}_phone`"
                    v-model="contact.phone"
                    @input="v$.phone.$touch()"
                    :class="v$.phone.$invalid ? 'p-invalid' : ''"
                    mask="(999) 999-9999"
                />
                <label :for="`contact_${type}_phone`">Phone</label>
              </span>
          <div v-for="error of v$.phone.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </div>
        </div>
      </div>
    </div>
  </Fieldset>
</template>

<script setup>
import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import {useVuelidate} from "@vuelidate/core";
import {nominationsDataStore} from "@/stores/nominations.store";
import {validatePhone} from "@/services/validation.services";
import {email, required, helpers} from "@vuelidate/validators";

// define data prop
const props = defineProps({
  contact: Object,
  legend: String,
  type: String
});

// get current user
const { current } = storeToRefs(authDataStore());

// load nomination state
const { selected, submitted, error } = storeToRefs(nominationsDataStore());

// apply validators
const v$ = useVuelidate({
  firstname: {required},
  lastname: {required},
  email: {required, email},
  phone: {
    accepted: helpers.withMessage(
        "Invalid phone number", (data) => {
          return validatePhone(data)
        })
  }
}, props.contact);

</script>
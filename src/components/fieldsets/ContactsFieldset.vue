<template>
  <div id="contacts-fieldset" class="card"><!-- Nominator Contacts -->
    <h3>Contacts</h3>
    <ContactFieldset :contact="selected.contacts.primary" legend="Nomination Contact" type="primary">
      <template v-slot:overview>
        <p>
          The nomination contact is responsible for managing information relevant to the nomination. This may include confirming partner organizations, job titles, spelling and coordinating other resources or video/photo assets. The nomination contact should be someone who has been directly involved in completing the nomination process.
        </p>
      </template>
    </ContactFieldset>
    <ContactFieldset :contact="selected.contacts.video" legend="Video Contact" type="video">
      <template v-slot:overview>
        <p>
          The video contact acts as the nomination’s liaison between the nominating ministry and the Premier’s Awards team. This person works directly with the Premier’s Awards video production team to select interview candidates, coordinate their video shoots and filming locations. They also assist with the coordination of supporting video footage and materials.
        </p>
      </template>
    </ContactFieldset>
    <LocationsFieldset />
  </div><!-- End Nominator Contacts -->
</template>

<script setup>
import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import {useVuelidate} from "@vuelidate/core";
import {nominationsDataStore} from "@/stores/nominations.store";
import {helpers} from "@vuelidate/validators";
import {validateEmail} from "@/services/validation.services";

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, submitted, error } = storeToRefs(nominationsDataStore());

// apply validators
const v$ = useVuelidate({
    primary: helpers.withMessage(
        "Nomination contact is not complete.", (value) => {
          return selected.value.contacts.primary.firstname.length > 0
              && selected.value.contacts.primary.lastname.length > 0
              && validateEmail(selected.value.contacts.primary.email);
        }),
        video: helpers.withMessage(
    "Video contact is not complete.", (value) => {
      return selected.value.contacts.video.firstname.length > 0
          && selected.value.contacts.video.lastname.length > 0
          && validateEmail(selected.value.contacts.video.email)
          && selected.value.contacts.video.locations
              .filter(location => {
                return location.city.length === 0 || location.address.length === 0
              }).length === 0;
        }),
}, selected.contacts);

</script>
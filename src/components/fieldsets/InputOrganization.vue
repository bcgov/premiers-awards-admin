<template>
  <div>
    <b-card bg-variant="light" class="mb-3">
      <b-form-group
        id="input-group-organization"
        :label="label ? label : 'Name of Ministry or eligible organization sponsoring this application'"
        label-for="input-organization"
        label-size="lg"
        label-class="font-weight-bold pt-0"
      >
        <b-form-select
          id="input-organization"
          v-model="organization"
          :options="organizations"
          :state="validation"
          :disabled="submitted"
        >
        </b-form-select>
        <b-form-invalid-feedback :state="validation">
          This field is required.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Nomination organization selected.
        </b-form-valid-feedback>
      </b-form-group>

    </b-card>
  </div>
</template>

<script>

import formServices from '@/services/settings.services'

export default {
  name: "organization-input",
  props: {
    label: String
  },
  data() {
    return {
      organizations: formServices.get('organizations') || []
    }
  },
  computed: {
    organization: {
      get () {
        return this.$store.getters.getNomination.organization
      },
      set (value) {
        this.$store.dispatch("setNomination", { organization: value })
      }
    },
    validation() {
      return this.$store.getters.getValidation.organization
    },
    submitted() {
      return this.$store.getters.getNomination.submitted
    }
  }
};

</script>

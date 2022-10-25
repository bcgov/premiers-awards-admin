<template>
  <div class="mb-3">
    <b-alert v-if="partners.length >= maxPartners" variant="warning" show>
      You have reached the maximum of 12 partners.
    </b-alert>
    <b-card bg-variant="light" class="mb-3">
      <slot name="overview">
        <p>
          A partner is a ministry or external organization essential to the success of the nominated
          project or initiative. A partner should be significantly involved in the development and
          work of the nominated project or initiative.
        </p>
        <p>
          Please enter the partner organizations below. This list determines the number of award materials
          (framed certificates, trophies etc.) ordered should the nomination become a finalist.
          Please submit a <strong>maximum of 12 partners</strong>. If there is interest to submit
          more than 12, please email <a href="mailto:PremiersAwards@gov.bc.ca">PremiersAwards@gov.bc.ca</a>
          to discuss.
        </p>
      </slot>

      <b-form-group
        v-for="(partner, counter) in partners"
        v-bind:key="counter"
        label-cols-lg="3"
        :label="`Partner ${counter + 1}`"
        label-size="lg"
        label-class="font-weight-bold"
        class="mb-4 pb-4 pt-4"
      >

        <b-form-group
          :id="`fieldset-partners-${counter}-organization`"
          label="Organization"
          :label-for="`input-partners-${counter}-organization`"
        >
          <b-form-input
            :id="`input-partners-${counter}-organization`"
            v-model="partner.organization"
            placeholder="Enter the partner's organization name"
            :state="!!partner.organization"
            :disabled="submitted"
          />

          <b-form-invalid-feedback :state="!!partner.organization">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="!!partner.organization">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

        <b-button
          v-if="partners.length > 1"
          variant="outline-primary"
          @click="removePartner(counter)"
          :disabled="submitted"
        >
          Remove Partner
        </b-button>
      </b-form-group>
    </b-card>
    <b-button
      v-if="partners.length < maxPartners"
      block variant="outline-primary"
      @click="addPartner()"
      :disabled="submitted"
    >
      Add Partner
    </b-button>
  </div>
</template>

<script>

import formServices from '@/services/settings.services'

export default {
  name: "partners-input",
  props: {
    type: String
  },
  data() {
    return {
      maxPartners: 12,
      organizations: formServices.get('organizations')
    }
  },
  computed: {
    partners: {
      get () {
        return this.$store.getters.getNomination.partners;
      },
      set (value) {
        this.$store.dispatch("setNomination", {partners: value})
      }
    },
    submitted() {
      return this.$store.getters.getNomination.submitted
    }
  },
  methods: {
    addPartner(){
      if (this.partners.length <= this.maxPartners) {
        this.partners.push({ organization: null })
      }
    },
    removePartner(counter){
      if (this.partners.length > 1)
        this.partners.splice(counter,1);
    }
  }
};
</script>

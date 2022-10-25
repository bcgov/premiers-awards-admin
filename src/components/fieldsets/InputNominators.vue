<template>
  <div class="mb-3">
    <b-card bg-variant="light" class="mb-3">
      <b-form-group
        v-for="(nominator, counter) in nominators"
        v-bind:key="counter"
        label-cols-lg="3"
        :label="`Nominator ${counter > 0 ? counter + 1 : ''}`"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-4"
      >
        <slot name="overview" v-if="counter === 0">
          <p>The nominator is the person who will be identified in the video if the nomination is chosen as a finalist. Typically, the nominator is someone from the Executive who has been part of the nomination. The nominator and nomination contact can be the same person, but it is not recommended as there is considerable communication between the nomination contact and the Premier’s Awards team. Please fill out the section below if there is a secondary or co-nominator for this nomination.</p>
        </slot>

        <b-form-group
          :id="`fieldset-nominators-${counter}-firstname`"
          label="First Name"
          :label-for="`input-nominators-${counter}-firstname`"
        >
          <b-form-input
            :id="`input-nominators-${counter}-firstname`"
            v-model="nominator.firstname"
            placeholder="Enter the nominator's given name"
            :state="validate(counter, 'firstname')"
            :disabled="submitted"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validate(counter, 'firstname')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate(counter, 'firstname')">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          :id="`fieldset-nominators-${counter}-lastname`"
          label="Last Name"
          :label-for="`input-nominators-${counter}-lastname`"
        >
          <b-form-input
            :id="`input-nominators-${counter}-lastname`"
            v-model="nominator.lastname"
            placeholder="Enter the nominator's last name"
            :state="validate(counter, 'lastname')"
            :disabled="submitted"
          />
          <b-form-invalid-feedback :state="validate(counter, 'lastname')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate(counter, 'lastname')">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          :id="`fieldset-nominators-${counter}-title`"
          label="Nominator Title"
          :label-for="`input-nominators-${counter}-title`"
        >
          <b-form-input
            :id="`input-nominators-${counter}-title`"
            v-model="nominator.title"
            placeholder="Enter the nominator's title"
            :state="validate(counter, 'title')"
            :disabled="submitted"
          ></b-form-input>
          <b-form-invalid-feedback :state="validate(counter, 'title')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate(counter, 'title')">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          :id="`fieldset-nominators-${counter}-email`"
          label="Email"
          :label-for="`input-nominators-${counter}-email`"
        >
          <b-form-input
            type="email"
            :id="`input-nominators-${counter}-email`"
            v-model="nominator.email"
            placeholder="Enter the nominator's contact email"
            :state="validate(counter, 'email')"
            :disabled="submitted"
          />
          <b-form-invalid-feedback :state="validate(counter, 'email')">
            Please enter a valid email address.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate(counter, 'email')">
            Valid email address.
          </b-form-valid-feedback>
        </b-form-group>

      </b-form-group>
    </b-card>

  </div>
</template>

<script>

import {validateEmail} from '@/services/validation.services'

export default {
  name: "nominators-input",
  computed: {
    nominators: {
      get () {
        return this.$store.getters.getNomination.nominators;
      },
      set (value) {
        this.$store.dispatch("setNomination", {nominators: value})
      }
    },
    validate(){
      return (id, field) => {

        const hasAdditional = this.nominators[1].firstname.length > 0
          || this.nominators[1].lastname.length > 0
          || this.nominators[1].title.length > 0
          || this.nominators[1].email.length > 0

        // ignore validation for empty additional nominator
        if (id > 0 && !hasAdditional) return null

        const fields = {
          firstname: ()=>{
            return this.nominators[id].firstname.length > 0
          },
          lastname: ()=>{
            return this.nominators[id].lastname.length > 0
          },
          title: ()=>{
            return this.nominators[id].title.length > 0
          },
          email: ()=>{
            return validateEmail(this.nominators[id].email)
          }
        }
        // console.log(fields[field](), field, id, this.nominators[id].title)
        if (fields[field] === 'undefined') return false;
        return !!fields[field]();
      }
    },
    submitted() {
      return this.$store.getters.getNomination.submitted
    }
  }
}
</script>


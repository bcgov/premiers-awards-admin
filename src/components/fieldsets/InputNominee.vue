<template>
  <div class="mb-3">
    <b-card bg-variant="light" class="mb-3">
      <slot name="overview"></slot>

        <b-form-group
          id="fieldset-nominee-firstname"
          label="First Name"
          label-for="input-nominees-firstname"
        >
          <b-form-input
            id="input-nominees-firstname"
            v-model="nominee.firstname"
            placeholder="Enter the nominee's given name"
            :state="validate('firstname')"
            :disabled="submitted"
          />
          <b-form-invalid-feedback :state="validate('firstname')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate('firstname')">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="fieldset-nominee-lastname"
          label="Last Name"
          label-for="input-nominee-lastname"
        >
          <b-form-input
            id="input-nominee-lastname"
            v-model="nominee.lastname"
            placeholder="Enter the nominee's last name"
            :state="validate('lastname')"
            :disabled="submitted"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validate('lastname')">
            This field is required.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validate('lastname')">
            Completed correctly.
          </b-form-valid-feedback>
        </b-form-group>

    </b-card>
  </div>
</template>

<script>

export default {
  name: "single-nominee-input",
  computed: {
    nominee: {
      get () {
        return this.$store.getters.getNomination.nominee;
      },
      set (value) {
        this.$store.dispatch("setNomination", {nominee: value})
      }
    },
    validate(){
      return (field) => {
        const fields = {
          firstname: ()=>{
            return this.nominee.firstname.length > 0
          },
          lastname: ()=>{
            return this.nominee.lastname.length > 0
          }
        }
        if (fields[field] === 'undefined') return false;
        return !!fields[field]();
      }
    },
    submitted() {
      return this.$store.getters.getNomination.submitted
    }
  }
};
</script>

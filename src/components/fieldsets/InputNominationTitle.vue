<template>
  <div>
    <b-card bg-variant="light" class="mb-3">

      <b-form-group
        id="input-group-title"
        label="Title of Nomination"
        label-for="input-title"
        label-size="lg"
        label-class="font-weight-bold pt-0"
      >
        <b-form-input
          id="input-title"
          v-model="title"
          placeholder="Enter a title for this nomination"
          :state="validation"
          :disabled="submitted"
        >
        </b-form-input>

        <b-form-invalid-feedback :state="validation">
          This field is required.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Nomination title completed.
        </b-form-valid-feedback>

      </b-form-group>

    </b-card>
  </div>
</template>

<script>

export default {
  name: "nomination-title-input",
  computed: {
    title: {
      get () {
        return this.$store.getters.getNomination.title
      },
      set (value) {
        this.$store.dispatch("setNomination", {title: value})
      }
    },
    validation () {
      return this.$store.getters.getValidation.title
    },
    submitted() {
      return this.$store.getters.getNomination.submitted
    }
  }
};
</script>


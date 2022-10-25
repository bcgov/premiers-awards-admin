<template>
  <div class="mb-3">
    <b-card bg-variant="light" class="mb-3">
      <slot name="overview">
        <p>
          A nominee is an individual team member essential to the success of the nominated project
          or initiative. A nominee should be significantly involved in the development and work of
          the nominated project and initiative.
        </p>
        <p>
          Please consider retaining a list of names for your organization’s purpose should this
          nomination be selected as a finalist for award distribution.
        </p>
        <p>
          Please enter the number of individuals who played a significant role in the initiative,
          program or project.
        </p>
      </slot>

      <b-form-group
        id="fieldset-nominees-number"
        label="Number of Nominees"
        label-for="input-nominees-number"
      >
        <b-form-input
          type="number"
          min="0"
          id="input-nominees-number"
          v-model="nominees"
          placeholder="Enter the number of nominees"
          :disabled="submitted"
        />
      </b-form-group>
    </b-card>
  </div>
</template>

<script>

export default {
  name: "nominees-count-input",
  computed: {
    nominees: {
      get () {
        return this.$store.getters.getNomination.nominees;
      },
      set (value) {
        this.$store.dispatch("setNomination", {nominees: value})
      }
    },
    submitted() {
      return this.$store.getters.getNomination.submitted
    }
  }
};
</script>

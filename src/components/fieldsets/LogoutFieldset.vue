<template>
      <b-form @submit="submit" class="p-3">
          <b-button class="m-2" type="submit" variant="primary">Sign Out</b-button>
      </b-form>
</template>

<script>

export default {
  name: "logout-input",
  data() {
    return {
      error: '',
      success: ''
    }
  },
  methods: {
    async submit(event) {
      event.preventDefault();
      try {
        await this.$store.dispatch('logout');
        this.error = false
        this.message = 'Successfully logged out!'
        // redirect to homepage
        if (this.$route.name !== 'home') {
          await this.$indexRouter.push({name: 'home'})
        }
      } catch (err) {
        console.error(err);
        this.error = true
        this.message = 'Failed to log out user.'
      }
    }
  }
};
</script>

